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
      class="min-h-screen min-w-screen flex justify-center items-center dark:bg-gray-900 transition-all duration-300 ease-in-out px-8"
    >
      <div
        class="p-8 bg-white shadow-2xl rounded-lg dark:bg-gray-600 max-w-2xl w-full"
      >
        <app-header></app-header>
        <router-outlet></router-outlet>
        <app-footer></app-footer>
      </div>
    </div>
  `,
})
export class AppComponent {
  private themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.setTheme();
  }
}
