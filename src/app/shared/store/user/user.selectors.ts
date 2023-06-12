import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

export const selectUsersState = (state: AppState) => state.users;

export const selectAllUsers = createSelector(
  selectUsersState,
  (userState: UserState) => userState.users
);

export const addUserLoading = createSelector(
  selectUsersState,
  (userState: UserState) => userState.addUserLoading
);

export const loadingUsers = createSelector(
  selectUsersState,
  (userState: UserState) => userState.loading
);

export const usersError = createSelector(
  selectUsersState,
  (userState: UserState) => userState.error
);

export const isDeletingUser = (id: string) =>
  createSelector(selectUsersState, (userState: UserState) =>
    userState.loadingDeleteIds.includes(id)
  );

export const selectUser = createSelector(
  selectUsersState,
  (userState: UserState) => userState.user.data
);

export const selectUserLoading = createSelector(
  selectUsersState,
  (userState: UserState) => userState.user.loading
);

export const selectUserError = createSelector(
  selectUsersState,
  (userState: UserState) => userState.user.error
);
