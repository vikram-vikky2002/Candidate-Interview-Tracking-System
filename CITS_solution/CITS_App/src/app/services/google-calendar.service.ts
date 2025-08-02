import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

// Declare gapi and google types to avoid TypeScript errors
declare var gapi: any;
declare var google: any;

@Injectable({
    providedIn: 'root'
})
export class GoogleCalendarService {
    // *** IMPORTANT: Replace these with your actual credentials from Google Cloud Console ***
    private readonly CLIENT_ID = '937082508160-8st5i8fq654hl9e3di3p7iau28m25203.apps.googleusercontent.com';
    private readonly API_KEY = 'AIzaSyB-_qn28Afk1N_rmUe2cQiVTnn-MmY-0KE';
    private readonly DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    private readonly SCOPES = 'https://www.googleapis.com/auth/calendar.events';

    // Observables to track the authentication state and event data
    private authState = new BehaviorSubject<boolean>(false);
    private meetLink = new BehaviorSubject<string | null>(null);
    private eventId = new BehaviorSubject<string | null>(null);
    private errorMessage = new BehaviorSubject<string | null>(null);
    private _isApiLoading = new BehaviorSubject<boolean>(true);
    private _isGsiLoading = new BehaviorSubject<boolean>(true);

    // Combine loading states to show a single, clear loading indicator
    public isLoading$ = combineLatest([this._isApiLoading, this._isGsiLoading]).pipe(
        map(([isApiLoading, isGsiLoading]) => isApiLoading || isGsiLoading)
    );

    public authState$ = this.authState.asObservable();
    public meetLink$ = this.meetLink.asObservable();
    public eventId$ = this.eventId.asObservable();
    public errorMessage$ = this.errorMessage.asObservable();

    private tokenClient: any;

    constructor() {
        // Load the Google API libraries when the service is initialized
        this.loadGoogleApi();
    }

    private loadGoogleApi() {
        // Load the Google Identity Services library for authentication
        const scriptGsi = document.createElement('script');
        scriptGsi.src = "https://accounts.google.com/gsi/client";
        scriptGsi.async = true;
        scriptGsi.defer = true;
        document.body.appendChild(scriptGsi);
        scriptGsi.onload = () => {
            this._isGsiLoading.next(false);
            this.gsiLoaded();
        };

        // Load the Google API client library
        const scriptGapi = document.createElement('script');
        scriptGapi.src = "https://apis.google.com/js/api.js";
        scriptGapi.async = true;
        scriptGapi.defer = true;
        document.body.appendChild(scriptGapi);
        scriptGapi.onload = () => {
            this._isApiLoading.next(false);
            this.gapiLoaded();
        };
    }

    private gsiLoaded() {
        this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES,
            callback: (tokenResponse: any) => {
                if (tokenResponse && tokenResponse.access_token) {
                    gapi.client.setToken(tokenResponse);
                    this.authState.next(true);
                    this.errorMessage.next(null);
                    console.log('User signed in. Access token:', tokenResponse.access_token);
                } else {
                    this.authState.next(false);
                    this.errorMessage.next('Failed to get access token.');
                    console.error('Failed to get access token.');
                }
            },
        });
        
        // Immediately request an access token on load to automatically sign in
        this.tokenClient.requestAccessToken();
    }

    private gapiLoaded() {
        gapi.load('client', () => {
            gapi.client.init({
                apiKey: this.API_KEY,
                discoveryDocs: this.DISCOVERY_DOCS,
            }).then(() => {
                console.log('Google API client initialized.');
            }, (error: any) => {
                this.errorMessage.next('Failed to initialize Google API client.');
                console.error('Failed to initialize Google API client:', error);
            });
        });
    }

    // A simple public method to trigger the auth flow again if needed
    public signIn(): void {
        this.tokenClient.requestAccessToken();
    }

    async createMeetEvent(summary: string, description: string, attendees: string[]) {
        if (!gapi.client.getToken()) {
            this.errorMessage.next('No access token available. Attempting to sign in...');
            console.error('No access token available. Attempting to sign in...');
            // Attempt to re-authenticate if token is missing
            this.tokenClient.requestAccessToken();
            return;
        }

        this._isApiLoading.next(true);
        this.meetLink.next(null);
        this.eventId.next(null);
        this.errorMessage.next(null);

        const now = new Date();
        const endTime = new Date(now.getTime() + 60 * 60000); // 1 hour duration

        const event = {
            'summary': summary,
            'description': description,
            'start': {
                'dateTime': now.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            'end': {
                'dateTime': endTime.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            'conferenceData': {
                'createRequest': {
                    'requestId': Math.random().toString(36).substring(7),
                    'conferenceSolutionKey': {
                        'type': 'hangoutsMeet',
                    },
                },
            },
            // The 'attendees' list now includes the authenticated user's email
            // automatically, so we just need to add the other invitees.
            'attendees': attendees.map(email => ({ 'email': email })),
        };

        try {
            // The 'primary' calendar ID creates the event on the currently authenticated user's calendar.
            const response = await gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
                'conferenceDataVersion': 1,
            });

            const createdEvent = response.result;
            this._isApiLoading.next(false);
            console.log('Event created:', createdEvent);

            if (createdEvent && createdEvent.hangoutLink) {
                this.meetLink.next(createdEvent.hangoutLink);
                this.eventId.next(createdEvent.id);
            } else {
                this.errorMessage.next('Error: Meet link not found in the response.');
            }

        } catch (error: any) {
            this._isApiLoading.next(false);
            console.error('Error creating calendar event:', error);
            this.errorMessage.next(`Error creating event: ${error.result?.error?.message || 'Unknown error'}`);
        }
    }
}