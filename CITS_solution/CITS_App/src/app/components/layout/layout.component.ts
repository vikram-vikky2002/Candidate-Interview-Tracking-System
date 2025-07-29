import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarVisible = false;

  @ViewChild('sidebar') sidebarRef!: ElementRef;

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
