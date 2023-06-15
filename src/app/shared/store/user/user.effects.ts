import { Injectable, inject } from '@angular/core';
import { exhaustMap, map, catchError, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  // Inject Actions from NGRX
  private actions$ = inject(Actions);

  // Inject User Service
  private userService = inject(UserService);

  // If the load users action is dispatched send request to server and handle response
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() =>
        this.userService.loadUsers().pipe(
          // No Error Handle Success Action
          map((users) => UserActions.loadUsersSuccess({ users })),
          // Catch Error Handle Failure Action
          catchError((error: string) =>
            of(UserActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  );

  // If the add user action is dispatched send request to server and handle response
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({ user }) =>
        this.userService.createUser(user).pipe(
          // No Error Handle Success Action
          map((user) => UserActions.addUserSuccess({ user })),
          // Catch Error Handle Failure Action
          catchError((error: string) =>
            of(UserActions.addUserFailure({ error })).pipe(
              tap((data) => console.log(data))
            )
          )
        )
      )
    )
  );

  // If the delete user action is dispatched send request to server and handle response
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          // No Error Handle Success Action
          map((user) => UserActions.deleteUserSuccess({ user })),
          // Catch Error Handle Failure Action
          catchError((error: string) =>
            of(UserActions.deleteUserFailure({ error, userId: id }))
          )
        )
      )
    )
  );

  // If the fetch user action is dispatched send request to server and handle response
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUser),
      switchMap(({ id }) =>
        this.userService.fetchUser(id).pipe(
          // No Error Handle Success Action
          map((user) => UserActions.fetchUserSuccess({ user })),
          // Catch Error Handle Failure Action
          catchError((error: string) =>
            of(UserActions.fetchUserFailure({ error }))
          )
        )
      )
    )
  );
}
