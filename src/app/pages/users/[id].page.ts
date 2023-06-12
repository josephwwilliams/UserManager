import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, of, shareReplay, switchMap } from 'rxjs';
import { ButtonComponent } from '../../../lib/components/button';
import { Store } from '@ngrx/store';
import { UserActions } from '../../shared/store/user/user.actions';
import {
  selectUser,
  selectUserError,
  selectUserLoading,
} from '../../shared/store/user/user.selectors';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, RouterLink, ButtonComponent],
  template: `
    <div class="flex flex-col gap-6">
      <app-button routerLink="/" buttonText="Back"></app-button>
      <div *ngIf="user$ | async as user; else noUser">
        <div
          class="flex flex-col gap-8 rounded-xl shadow pt-24 bg-gray-300 dark:bg-gray-500"
        >
          <div class="flex relative">
            <img
              src="https://source.unsplash.com/user/wsanter"
              class="w-40 h-40 rounded-full absolute top-0 shadow border-2 border-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white object-cover"
            />
            <div
              class="h-48 w-full bg-slate-700 dark:bg-slate-900 rounded-b-xl flex flex-col items-center justify-center"
            >
              <h3 class="text-2xl text-white font-semibold pt-10">
                {{ user.name }}
              </h3>
              <p class="text-xl text-white">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <ng-template #noUser>
        <div
          class="flex flex-col items-center justify-center"
          *ngIf="userError$ | async"
        >
          <span class="text-6xl">😢</span>
          <p class="text-xl text-gray-600 dark:text-gray-300 py-2">
            No user found
          </p>
        </div>
        <div
          class="flex flex-col items-center justify-center"
          *ngIf="(userLoading$ | async) && !(userError$ | async)"
        >
          <span class="text-6xl">👨‍🚀</span>
          <p class="text-xl text-gray-600 dark:text-gray-300 py-2">
            Loading...
          </p>
        </div>
      </ng-template>
    </div>
  `,
})
export default class UserDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private store = inject(Store);

  readonly userLoading$ = this.store.select(selectUserLoading);
  readonly userError$ = this.store.select(selectUserError).pipe(shareReplay(1));

  readonly user$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id) => id !== null),
    switchMap((id) => {
      this.store.dispatch(UserActions.fetchUser({ id: id! }));
      return this.store.select(selectUser, { id: id! });
    })
  );
}
