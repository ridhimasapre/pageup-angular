import { Component } from '@angular/core';
import { AuthService } from './modules/user-auth/user-auth/service/auth.service';
import { SidebarServiceService } from './modules/SharedModules/shared/Sidebar/SidebarService/sidebar-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-Api';
  // constructor(public authService: AuthService) {}
  // isSidebarActive = false;
  // toggleSidebar() {
  //   this.isSidebarActive = !this.isSidebarActive;
  // }
  // isSidebarOpen = false;
  // constructor(private themeService: SidebarServiceService) {
  //   this.themeService.loadTheme();
  // }

  // public onToggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  // }

  // public onToggleTheme() {
  //   this.themeService.toggleTheme();
  // }
  isDarkMode: boolean = false;
  isSidebarOpen: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
