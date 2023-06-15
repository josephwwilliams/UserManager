import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../lib/components/button';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="mx-auto w-full space-y-8 my-8">
      <div>
        <h1 class="text-center text-8xl ">🚧</h1>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-slate-200"
        >
          Page Not Found
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-slate-300">
          Sorry, we couldn't find what you were looking for.
        </p>
      </div>
      <div>
        <app-button
          buttonText="Go Back Home"
          styles="w-full"
          routerLink="/"
        ></app-button>
      </div>
    </div>
  `,
})
export default class PageNotFoundComponent {}
