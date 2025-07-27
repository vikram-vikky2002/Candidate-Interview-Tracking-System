import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  candidates: any[] = [];
  displayedColumns: string[] = ['fullName', 'email', 'role'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7181/api/Candidate')
      .subscribe(res => this.candidates = res);
  }
}
