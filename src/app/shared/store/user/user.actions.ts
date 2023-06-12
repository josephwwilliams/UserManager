import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Prisma, User } from '@prisma/client';

export const UserActions = createActionGroup({
  source: 'Home',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Add User': props<{ user: Prisma.UserCreateInput }>(),
    'Add User Success': props<{ user: User }>(),
    'Add User Failure': props<{ error: string }>(),

    'Delete User': props<{ id: string }>(),
    'Delete User Success': props<{ user: User }>(),
    'Delete User Failure': props<{ error: string; userId: string }>(),

    'Fetch User': props<{ id: string }>(),
    'Fetch User Success': props<{ user: User }>(),
    'Fetch User Failure': props<{ error: string }>(),
  },
});
