
import counterReducer, { CounterState } from '../features/counter/counterSlice'
import stripeReducer, { StripeSlice } from '../features/stripe/stripeSlice'
import jobsReducer, { JobsSlice } from '../features/jobs/jobsSlice'
import userReducer, { UserSlice } from '../features/user/userSlice'


import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Store,
  AnyAction,
  CombinedState,
  EnhancedStore,
} from "@reduxjs/toolkit";

import { ThunkMiddleware } from "redux-thunk";


type StoreType = EnhancedStore<
  CombinedState<{ counter: CounterState, stripe: StripeSlice, jobs: JobsSlice, user: UserSlice }>,
  AnyAction,
  [
    | ThunkMiddleware<CombinedState<{ counter: CounterState, stripe: StripeSlice, jobs: JobsSlice, user: UserSlice }>, AnyAction, null>
    | ThunkMiddleware<
        CombinedState<{ counter: CounterState, stripe: StripeSlice, jobs: JobsSlice, user: UserSlice }>,
        AnyAction,
        undefined
      >
  ]
>;

const rootReducer = combineReducers({
  counter: counterReducer,
  stripe: stripeReducer,
  jobs: jobsReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

let _store: StoreType;

export function makeStore(preloadedState: object | null = null): StoreType {
  if (!_store) {
    _store = configureStore({
      ...(preloadedState && { preloadedState }),
      reducer: rootReducer,
    });
  }

  return _store;
}

const store: StoreType = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;