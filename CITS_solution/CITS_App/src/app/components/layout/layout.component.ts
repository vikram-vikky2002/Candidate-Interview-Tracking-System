import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarVisible = false;
  roleId: number | null = null;
  fullName: string = '';

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.roleId = this.authService.getUserRoleId();
    this.fullName = this.authService.getFullName() || 'User';
  }


  logout() {
    this.authService.logout();
  }
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const clickedInsideSidebar = this.sidebarRef?.nativeElement.contains(event.target);
    const clickedToggleBtn = (event.target as HTMLElement).classList.contains('menu-icon');

    if (!clickedInsideSidebar && !clickedToggleBtn) {
      this.isSidebarVisible = false;
    }
  }
}
