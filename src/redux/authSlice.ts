import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null
  csrfToken?: string | null
  role: string[]
  username: string
}

const initialState: AuthState = {
  accessToken: null,
  role: [],
  username: "",

}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; role: string[]; username: string }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.role = action.payload.role
      state.username = action.payload.username
    },
    logout: (state) => {
      state.accessToken = null
      state.role = []
      state.username = ""
    },
    updateToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      console.log('Updating token in auth slice:', action.payload.accessToken)
      state.accessToken = action.payload.accessToken
    }
  },
})

export const { setCredentials, logout, updateToken } = authSlice.actions
export default authSlice.reducer
