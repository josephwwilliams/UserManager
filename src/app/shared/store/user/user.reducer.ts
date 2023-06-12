import { createReducer, on } from '@ngrx/store';
import { User } from '@prisma/client';
import { UserActions } from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  addUserLoading: boolean;
  error: string | null;
  loadingDeleteIds: string[];
  user: {
    data: User | null;
    loading: boolean;
    error: string | null;
  };
}

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

export const userReducer = createReducer(
  initalState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return {
      ...state,
      users: users,
      loading: false,
      error: null,
    };
  }),
  on(UserActions.loadUsersFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),

  on(UserActions.addUser, (state) => {
    return {
      ...state,
      addUserLoading: true,
    };
  }),
  on(UserActions.addUserSuccess, (state, { user }) => {
    return {
      ...state,
      users: [...state.users, user],
      addUserLoading: false,
      error: null,
    };
  }),
  on(UserActions.addUserFailure, (state, { error }) => {
    return {
      ...state,
      addUserLoading: false,
      error: error,
    };
  }),

  on(UserActions.deleteUser, (state, { id }) => {
    return {
      ...state,
      loading: true,
      loadingDeleteIds: [...state.loadingDeleteIds, id],
    };
  }),
  on(UserActions.deleteUserSuccess, (state, { user }) => {
    return {
      ...state,
      users: state.users.filter((u) => u.id !== user.id),
      loadingDeleteIds: state.loadingDeleteIds.filter((id) => id !== user.id),
      loading: false,
      error: null,
    };
  }),
  on(UserActions.deleteUserFailure, (state, { error, userId }) => {
    return {
      ...state,
      loading: false,
      loadingDeleteIds: state.loadingDeleteIds.filter((id) => id !== userId),
      error: error,
    };
  }),

  on(UserActions.fetchUser, (state) => {
    return {
      ...state,
      user: {
        data: null,
        loading: true,
        error: null,
      },
    };
  }),
  on(UserActions.fetchUserSuccess, (state, { user }) => {
    return {
      ...state,
      user: {
        data: user,
        loading: false,
        error: null,
      },
    };
  }),
  on(UserActions.fetchUserFailure, (state, { error }) => {
    return {
      ...state,
      user: {
        data: null,
        loading: false,
        error: error,
      },
    };
  })
);
