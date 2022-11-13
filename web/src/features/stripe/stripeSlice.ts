import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

import type { AppState, AppThunk } from '../../app/store'
import { fetchCreateCustomer, fetchCreateSubscription, fetchGetSubscription } from './subscriptionsAPI'

export interface StripeSlice {
  customer: any
  subscription: any,
  priceChoiceId: string,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: StripeSlice = {
  customer: {},
  subscription: {},
  priceChoiceId: null,
  status: 'idle',
}

export const getStripeSubscription = createAsyncThunk(
  'stripe/getStripeSubscription',
  async () => {
    const response = await fetchGetSubscription()
    return response;
  }
)

export const createStripeCustomerAsync = createAsyncThunk(
  'stripe/createStripeCustomer',
  async (createCustomerRequestBody:any) => {
    const response = await fetchCreateCustomer(createCustomerRequestBody)
    return response
  }
)

export const creteStripeSubscriptionAsync = createAsyncThunk(
  'stripe/createStripeSubscription',
  async (createSubscriptionRequestBody: any) => {
    const response = await fetchCreateSubscription(createSubscriptionRequestBody);
    return response;
  }
)

export const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    setPriceChoice: (state, action: PayloadAction<string>) => {
      state.priceChoiceId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStripeCustomerAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createStripeCustomerAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.customer = action.payload
      })
      .addCase(creteStripeSubscriptionAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(creteStripeSubscriptionAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.subscription = action.payload
      })
      .addCase(getStripeSubscription.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getStripeSubscription.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.code ==="no_subscription_against_user"){
          return
        }
        state.subscription = action.payload;
      })
  },
})

export const { setPriceChoice } = stripeSlice.actions

export const selectStripeCustomer = (state: AppState) => state.stripe.customer
export const selectStripeSubscription = (state: AppState) => state.stripe.subscription;
export const selectStripeSubscriptionLoading = (state: AppState) => state.stripe.status === 'loading'
export const selectPriceChoice = (state: AppState) => state.stripe.priceChoiceId;

export default stripeSlice.reducer
