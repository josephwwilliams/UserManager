import { Component, inject } from '@angular/core';
import { ThemeService } from '../../app/shared/services/theme/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div
      class="flex justify-between items-center flex-col md:flex-row gap-4 pb-4"
    >
      <div
        class="text-3xl dark:text-slate-300 text-center md:text-left drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      >
        User Manager Pro 😎
      </div>
      <div class="flex justify-between gap-5">
        <!-- Theme Toggler -->
        <div class="dark:text-slate-300">Light</div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            [checked]="this.themeService.theme === 'dark'"
            (change)="this.themeService.toggleTheme()"
            class="sr-only peer"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>
        <div class="dark:text-slate-300">Dark</div>
      </div>
    </div>
  `,
})
export class HeaderComponent {
  // Inject Theme Service
  public themeService = inject(ThemeService);
}
