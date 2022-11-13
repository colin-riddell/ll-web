import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

import type { AppState, AppThunk } from '../../app/store'
import { fetchCreateJobListing, fetchGetJobsForCustomer } from './jobsAPI'

export interface JobsSlice {
  jobs: any
  status: 'idle' | 'loading' | 'failed'
}

const initialState: JobsSlice = {
  jobs: [],
  status: 'idle',
}

export const getUsersJobListings = createAsyncThunk(
  'jobs/getUsersJobListings',
  async () => {
    const response = await fetchGetJobsForCustomer();
    return response;
  }
)

export const createJobListingAsync = createAsyncThunk(
  'jobs/createJobListing',
  async (createJobListingBody:any) => {
    const response = await fetchCreateJobListing(createJobListingBody)
    return response
  }
)


export const stripeSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobListingAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createJobListingAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.jobs.push(action.payload);
      })
      .addCase(createJobListingAsync.rejected, (state, action) => {
        state.status = 'failed'
        //TODO: set error state
      })
      .addCase(getUsersJobListings.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUsersJobListings.fulfilled, (state, action) => {
        state.status = 'idle'
        state.jobs = action.payload;
      })
      .addCase(getUsersJobListings.rejected, (state, action) => {
        state.status = 'failed'
        //TODO: set error state
      })
      
  },
})

// export const { setPriceChoice } = stripeSlice.actions

export const selectJobs = (state: AppState) => state.jobs.jobs


export default stripeSlice.reducer
