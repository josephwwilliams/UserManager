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
      <!-- Create User Form -->
      <form
        [formGroup]="userForm"
        #localForm="ngForm"
        (ngSubmit)="onSubmit()"
        class="space-y-4 "
      >
        <!-- Name Input -->
        <app-input
          [control]="name"
          label="Name"
          type="text"
          placeholder="Enter name"
          [required]="true"
        ></app-input>

        <!-- Email Input -->
        <app-input
          [control]="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          [required]="true"
        ></app-input>

        <!-- Profile Picture Input -->
        <app-input
          [control]="image_url"
          label="Avatar"
          type="text"
          placeholder="Enter an image URL"
          [required]="true"
        ></app-input>

        <!-- Submit Button -->
        <app-button
          buttonType="submit"
          [isLoading]="addUserLoading$ | async"
          buttonText="Add User"
          styles="w-full"
          variant="submit"
          [disabled]="usersLoading$ | async"
        ></app-button>

        <!-- Error Display -->
        <h2
          class="text-lg font-bold text-red-400 text-center"
          *ngIf="usersError$ | async as Error"
        >
          {{ Error | parseError }}
        </h2>
      </form>

      <!-- Diplay Users -->
      <ul class="space-y-4 max-h-72 custom-scrollbar overflow-y-auto p-1">
        <ng-container *ngIf="(users$ | async)?.length; else noUsers">
          <li
            *ngFor="let user of users$ | async"
            class="flex justify-between items-center p-4 bg-gray-100 rounded shadow flex-col sm:flex-row gap-4"
          >
            <div class="flex flex-col">
              <!-- User Name -->
              <span
                class="text-lg text-gray-800 mx-1 font-bold text-center sm:text-left"
                >{{ user.name }}</span
              >
              <!-- User Email -->
              <span
                class="text-sm text-gray-600/30 mx-1 font-semibold text-center sm:text-left"
                >{{ user.email }}</span
              >
            </div>

            <div class="flex flex-col gap-4 sm:flex-row">
              <!-- Routes to users page -->
              <app-button
                buttonText="Details"
                [routerLink]="['/users/' + user.id]"
              ></app-button>
              <!-- Delete User Button -->
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

      <!-- Display if no users -->
      <ng-template #noUsers>
        <p
          *ngIf="!(usersLoading$ | async)"
          class="text-lg text-center text-gray-500 dark:text-slate-300"
        >
          No users found.
        </p>
      </ng-template>
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
  // Inject NGRX Store
  private store = inject(Store);
  // Inject Form Builder
  private fb = inject(FormBuilder);
  // Inject Theme Service
  public themeService = inject(ThemeService);

  // States
  public users$ = this.store.select(selectAllUsers);
  public usersLoading$ = this.store.select(loadingUsers).pipe(shareReplay(1));
  public addUserLoading$ = this.store
    .select(addUserLoading)
    .pipe(shareReplay(1));
  public usersError$ = this.store.select(usersError).pipe(shareReplay(1));

  // User Create Form
  public userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    image_url: ['', [Validators.required]],
  });

  // Getters
  get name() {
    return this.userForm.get('name') as FormControl;
  }

  get email() {
    return this.userForm.get('email') as FormControl;
  }

  get image_url() {
    return this.userForm.get('image_url') as FormControl;
  }

  // Lifecycles
  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  // Dispatch to delete a user
  onDelete(id: string) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }

  // Check to see which user is being deleted
  isDeleting(id: string) {
    return this.store.select(isDeletingUser(id));
  }

  // User Create Form Submission
  onSubmit() {
    if (this.userForm.invalid) return;
    const user: Prisma.UserCreateInput = this.userForm.value;
    // Dispatch create user action
    this.store.dispatch(UserActions.addUser({ user }));
  }
}
