import { Injectable, inject } from '@angular/core';
import { exhaustMap, map, catchError, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() =>
        this.userService.loadUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error: string) =>
            of(UserActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((user) => UserActions.addUserSuccess({ user })),
          catchError((error: string) =>
            of(UserActions.addUserFailure({ error })).pipe(
              tap((data) => console.log(data))
            )
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map((user) => UserActions.deleteUserSuccess({ user })),
          catchError((error: string) =>
            of(UserActions.deleteUserFailure({ error, userId: id }))
          )
        )
      )
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUser),
      switchMap(({ id }) =>
        this.userService.fetchUser(id).pipe(
          map((user) => UserActions.fetchUserSuccess({ user })),
          catchError((error: string) =>
            of(UserActions.fetchUserFailure({ error }))
          )
        )
      )
    )
  );
}
