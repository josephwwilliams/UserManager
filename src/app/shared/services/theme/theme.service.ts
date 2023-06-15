import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Inject platform
  private platformId: Object = inject(PLATFORM_ID);

  // Set default theme to dark
  public theme: 'dark' | 'light' = 'dark';

  setTheme() {
    // Check to see if we are on the client
    if (isPlatformBrowser(this.platformId)) {
      // Get localstorage setting
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        // Set the theme to the saved theme
        this.theme = savedTheme as 'light' | 'dark';
        document.documentElement.classList.add(savedTheme);
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  }

  toggleTheme() {
    // Check to see if we are on the client
    if (isPlatformBrowser(this.platformId)) {
      // Basic toggle for theme changing
      if (this.theme === 'light') {
        this.theme = 'dark';
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.theme = 'light';
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
