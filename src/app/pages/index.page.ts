import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Prisma } from '@prisma/client';
import { Store } from '@ngrx/store';
import {
  addUserLoading,
  isDeletingUser,
  loadingUsers,
  selectAllUsers,
  usersError,
} from '../shared/store/user/user.selectors';
import { UserActions } from '../shared/store/user/user.actions';
import { shareReplay } from 'rxjs';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ParseErrorPipe } from '../shared/pipes/errors/parse-error.pipe';
import { AppInputComponent } from '../../lib/components/input';
import { ButtonComponent } from '../../lib/components/button';
import { ThemeService } from '../shared/services/theme/theme.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="flex gap-6 flex-col">
      <form
        [formGroup]="userForm"
        #localForm="ngForm"
        (ngSubmit)="onSubmit()"
        class="space-y-4 "
      >
        <app-input
          [control]="name"
          label="Name"
          type="text"
          placeholder="Enter name"
          [required]="true"
        ></app-input>

        <app-input
          [control]="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          [required]="true"
        ></app-input>

        <app-input
          [control]="image_url"
          label="Avatar"
          type="text"
          placeholder="Enter an image URL"
          [required]="true"
        ></app-input>

        <app-button
          buttonType="submit"
          [isLoading]="addUserLoading$ | async"
          buttonText="Add User"
          styles="w-full"
          variant="submit"
          [disabled]="usersLoading$ | async"
        ></app-button>

        <h2
          class="text-lg font-bold text-red-400 text-center"
          *ngIf="usersError$ | async as Error"
        >
          {{ Error | parseError }}
        </h2>
      </form>

      <ng-template #noUsers>
        <p
          *ngIf="!(usersLoading$ | async)"
          class="text-lg text-center text-gray-500 dark:text-slate-300"
        >
          No users found.
        </p>
      </ng-template>

      <ul class="space-y-4">
        <ng-container *ngIf="(users$ | async)?.length; else noUsers">
          <li
            *ngFor="let user of users$ | async"
            class="flex justify-between items-center p-4 bg-gray-100 rounded shadow flex-col sm:flex-row gap-4"
          >
            <div class="flex flex-col">
              <span
                class="text-lg text-gray-800 mx-1 font-bold text-center sm:text-left"
                >{{ user.name }}</span
              >
              <span
                class="text-sm text-gray-600/30 mx-1 font-semibold text-center sm:text-left"
                >{{ user.email }}</span
              >
            </div>

            <div class="flex flex-col gap-4 sm:flex-row">
              <app-button
                buttonText="Details"
                [routerLink]="['/users/' + user.id]"
              ></app-button>
              <app-button
                variant="delete"
                (onButtonClick)="onDelete(user.id)"
                [isLoading]="isDeleting(user.id) | async"
                buttonText="Delete"
                [disabled]="usersLoading$ | async"
              ></app-button>
            </div>
          </li>
        </ng-container>
      </ul>
    </div>
  `,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    ParseErrorPipe,
    AppInputComponent,
    ButtonComponent,
    RouterLink,
  ],
})
export default class HomeComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  public themeService = inject(ThemeService);

  public users$ = this.store.select(selectAllUsers);
  public usersLoading$ = this.store.select(loadingUsers).pipe(shareReplay(1));
  public addUserLoading$ = this.store
    .select(addUserLoading)
    .pipe(shareReplay(1));
  public usersError$ = this.store.select(usersError).pipe(shareReplay(1));

  public userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    image_url: ['', [Validators.required]],
  });

  get name() {
    return this.userForm.get('name') as FormControl;
  }

  get email() {
    return this.userForm.get('email') as FormControl;
  }

  get image_url() {
    return this.userForm.get('image_url') as FormControl;
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  onDelete(id: string) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }

  isDeleting(id: string) {
    return this.store.select(isDeletingUser(id));
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const user: Prisma.UserCreateInput = this.userForm.value;
    this.store.dispatch(UserActions.addUser({ user }));
  }
}
