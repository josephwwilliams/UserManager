import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theme/theme.service';
import { HeaderComponent } from '../lib/components/header';
import { FooterComponent } from '../lib/components/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div
      class="min-h-screen min-w-screen flex justify-center items-center dark:bg-gray-900 transition-all duration-300 ease-in-out p-8"
    >
      <div
        class="p-8 bg-gray-100 shadow-2xl rounded-lg dark:bg-gray-600 max-w-2xl w-full"
      >
        <!-- Header -->
        <app-header></app-header>
        <!-- Outlet -->
        <router-outlet></router-outlet>
        <!-- Footer -->
        <app-footer></app-footer>
      </div>
    </div>
  `,
})
export class AppComponent {
  // Inject Theme Service
  private themeService = inject(ThemeService);

  ngOnInit() {
    // Set current theme
    this.themeService.setTheme();
  }
}
