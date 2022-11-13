import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../app/store';


export interface UserSlice {
  user: any,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UserSlice = {
  user: {},
  status: 'idle',
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  }
})

export const { setUser } = userSlice.actions

export const selectUser = (state: AppState) => state.user.user

export default userSlice.reducer
