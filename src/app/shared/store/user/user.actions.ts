import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Prisma, User } from '@prisma/client';

export const UserActions = createActionGroup({
  source: 'Home',
  events: {
    // Initial Action
    'Load Users': emptyProps(),
    // Success Action
    'Load Users Success': props<{ users: User[] }>(),
    // Failure Action
    'Load Users Failure': props<{ error: string }>(),

    // Initial Action
    'Add User': props<{ user: Prisma.UserCreateInput }>(),
    // Success Action
    'Add User Success': props<{ user: User }>(),
    // Failure Action
    'Add User Failure': props<{ error: string }>(),

    // Initial Action
    'Delete User': props<{ id: string }>(),
    // Success Action
    'Delete User Success': props<{ user: User }>(),
    // Failure Action
    'Delete User Failure': props<{ error: string; userId: string }>(),

    // Initial Action
    'Fetch User': props<{ id: string }>(),
    // Success Action
    'Fetch User Success': props<{ user: User }>(),
    // Failure Action
    'Fetch User Failure': props<{ error: string }>(),
  },
});
