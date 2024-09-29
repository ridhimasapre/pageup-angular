import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {
  private theme: string = 'dark-mode'; 
  constructor() {this.loadTheme(); }

  setTheme(theme: string) {
    this.theme = theme;
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
      document.body.className = this.theme;
    } else {
      document.body.className = this.theme;
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.setTheme(this.theme);
  }
}
