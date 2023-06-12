import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <section
      class="flex flex-col gap-6 mt-6 border-t-4 dark:border-slate-300 border-black"
    >
      <div class="text-center dark:text-slate-300 text-4xl pt-5">
        Tools Used 🥡
      </div>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a
          target="_blank"
          href="https://analogjs.org/"
          class="flex flex-col items-center justify-center px-4 py-2 border border-black dark:bg-gray-500 dark:text-white rounded-xl hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer"
        >
          <img src="/analog.svg" class="w-16 h-16" />
          <p class="text-center">Analog</p>
        </a>
        <a
          target="_blank"
          href="https://angular.io/"
          class="flex flex-col items-center justify-center px-4 py-2 border border-black dark:bg-gray-500 dark:text-white rounded-xl hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer"
        >
          <img
            src="https://angular.io/assets/images/logos/angular/angular.svg"
            class="w-16 h-16"
          />
          <p class="text-center">Angular</p>
        </a>
        <a
          target="_blank"
          href="https://ngrx.io/"
          class="flex flex-col items-center justify-center px-4 py-2 border border-black dark:bg-gray-500 dark:text-white rounded-xl hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer"
        >
          <img
            src="https://cdn.worldvectorlogo.com/logos/ngrx.svg"
            class="w-16 h-16"
          />
          <p class="text-center">NgRx</p>
        </a>
        <a
          target="_blank"
          href="https://tailwindcss.com/"
          class="flex flex-col items-center justify-center px-4 py-2 border border-black dark:bg-gray-500 dark:text-white rounded-xl hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer"
        >
          <img
            src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
            class="w-16 h-16"
          />
          <p class="text-center">Tailwind</p>
        </a>

        <a
          target="_blank"
          href="https://github.com/colinhacks/zod"
          class="flex flex-col items-center justify-center px-4 py-2 border border-black dark:bg-gray-500 dark:text-white rounded-xl hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer"
        >
          <img
            src="https://raw.githubusercontent.com/colinhacks/zod/5e23b4fae4715c7391f9ceb4369421a034851b4c/logo.svg"
            class="w-16 h-16"
          />
          <p class="text-center">Zod</p>
        </a>
        <a
          target="_blank"
          href="https://www.prisma.io/"
          class="flex flex-col items-center justify-center px-4 py-2 border border-black dark:bg-gray-500 dark:text-white rounded-xl hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer"
        >
          <img
            src="https://cdn.worldvectorlogo.com/logos/prisma-4.svg"
            class="w-16 h-16"
          />
          <p class="text-center">Prisma</p>
        </a>

        <a
          target="_blank"
          href="https://vitejs.dev/"
          class="flex flex-col items-center justify-center px-4 py-2 border border-black dark:bg-gray-500 dark:text-white rounded-xl hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer"
        >
          <img src="/vite.svg" class="w-16 h-16" />
          <p class="text-center">Vite</p>
        </a>
      </div>
    </section>
  `,
})
export class FooterComponent {}
