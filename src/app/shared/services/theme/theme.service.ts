import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: 'dark' | 'light' = 'dark';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.theme = savedTheme as 'light' | 'dark';
        document.documentElement.classList.add(savedTheme);
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
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
