import { createReducer, on } from '@ngrx/store';
import { User } from '@prisma/client';
import { UserActions } from './user.actions';

// Define the state for the UsersState
export interface UserState {
  users: User[]; // Array of users
  loading: boolean; // State to represent if users are being loaded
  addUserLoading: boolean; // State to represent if a new user is being added
  error: string | null; // State to store error message
  loadingDeleteIds: string[]; // Array to store IDs of users being deleted
  user: {
    data: User | null; // User data
    loading: boolean; // State to represent if user data is being loaded
    error: string | null; // State to store error message for user data
  };
}

// Initial state of the store
export const initalState: UserState = {
  users: [],
  loading: false,
  addUserLoading: false,
  error: null,
  loadingDeleteIds: [],
  user: {
    data: null,
    loading: false,
    error: null,
  },
};

// Create a reducer with handled actions
export const userReducer = createReducer(
  initalState,
  // When loadUsers action is dispatched
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      loading: true, // set loading state to true
    };
  }),
  // When loadUsers action is successful
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return {
      ...state,
      users: users, // populate users array
      loading: false, // set loading state to false
      error: null, // clear any errors
    };
  }),
  // When loadUsers action fails
  on(UserActions.loadUsersFailure, (state, { error }) => {
    return {
      ...state,
      loading: false, // set loading state to false
      error: error, // store the error
    };
  }),

  // When addUser action is dispatched
  on(UserActions.addUser, (state) => {
    return {
      ...state,
      addUserLoading: true, // set addUserLoading state to true
    };
  }),
  // When addUser action is successful
  on(UserActions.addUserSuccess, (state, { user }) => {
    return {
      ...state,
      users: [...state.users, user], // add new user to users array
      addUserLoading: false, // set addUserLoading state to false
      error: null, // clear any errors
    };
  }),
  // When addUser action fails
  on(UserActions.addUserFailure, (state, { error }) => {
    return {
      ...state,
      addUserLoading: false, // set addUserLoading state to false
      error: error, // store the error
    };
  }),

  // When deleteUser action is dispatched
  on(UserActions.deleteUser, (state, { id }) => {
    return {
      ...state,
      loading: true, // set loading state to true
      loadingDeleteIds: [...state.loadingDeleteIds, id], // add the user id to loadingDeleteIds array
    };
  }),
  // When deleteUser action is successful
  on(UserActions.deleteUserSuccess, (state, { user }) => {
    return {
      ...state,
      users: state.users.filter((u) => u.id !== user.id), // remove the user from users array
      loadingDeleteIds: state.loadingDeleteIds.filter((id) => id !== user.id), // remove the user id from loadingDeleteIds array
      loading: false, // set loading state to false
      error: null, // clear any errors
    };
  }),
  // When deleteUser action fails
  on(UserActions.deleteUserFailure, (state, { error, userId }) => {
    return {
      ...state,
      loading: false, // set loading state to false
      loadingDeleteIds: state.loadingDeleteIds.filter((id) => id !== userId), // remove the user id from loadingDeleteIds array
      error: error, // store the error
    };
  }),

  // When fetchUser action is dispatched
  on(UserActions.fetchUser, (state) => {
    return {
      ...state,
      user: {
        data: null, // clear user data
        loading: true, // set loading state to true
        error: null, // clear any errors
      },
    };
  }),
  // When fetchUser action is successful
  on(UserActions.fetchUserSuccess, (state, { user }) => {
    return {
      ...state,
      user: {
        data: user, // populate user data
        loading: false, // set loading state to false
        error: null, // clear any errors
      },
    };
  }),
  // When fetchUser action fails
  on(UserActions.fetchUserFailure, (state, { error }) => {
    return {
      ...state,
      user: {
        data: null, // clear user data
        loading: false, // set loading state to false
        error: error, // store the error
      },
    };
  })
);
