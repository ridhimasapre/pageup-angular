import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarActive = false;
  isLightMode = false;
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    document.documentElement.setAttribute("lightTheme",this.isLightMode  ? "lightmode" : "dark")
  }
}
