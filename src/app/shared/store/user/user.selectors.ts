import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

// Function to select the user state from the application state
export const selectUsersState = (state: AppState) => state.users;

// Selector to get all users
export const selectAllUsers = createSelector(
  selectUsersState, // input selector
  (userState: UserState) => userState.users // result function
);

// Selector to get the state of adding a user
export const addUserLoading = createSelector(
  selectUsersState, // input selector
  (userState: UserState) => userState.addUserLoading // result function
);

// Selector to get the state of loading users
export const loadingUsers = createSelector(
  selectUsersState, // input selector
  (userState: UserState) => userState.loading // result function
);

// Selector to get the error in the user state
export const usersError = createSelector(
  selectUsersState, // input selector
  (userState: UserState) => userState.error // result function
);

// Selector to check if a user is being deleted
export const isDeletingUser = (id: string) =>
  createSelector(
    selectUsersState, // input selector
    (userState: UserState) => userState.loadingDeleteIds.includes(id) // result function
  );

// Selector to get the selected user data
export const selectUser = createSelector(
  selectUsersState, // input selector
  (userState: UserState) => userState.user.data // result function
);

// Selector to get the state of loading the selected user
export const selectUserLoading = createSelector(
  selectUsersState, // input selector
  (userState: UserState) => userState.user.loading // result function
);

// Selector to get the error in the selected user state
export const selectUserError = createSelector(
  selectUsersState, // input selector
  (userState: UserState) => userState.user.error // result function
);
