import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
}

export const UserReducer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUser: (state, action) => {
        return {
            ...state,
            ...action.payload.user,
        }
    },
    logout: () => {
        return initialState
    }
  }
})

export const {fetchUser, logout } = UserReducer.actions

export default UserReducer.reducer