import { createSlice } from '@reduxjs/toolkit'
import { userLogIn, userUpdate } from './thunks'

export default createSlice({
    name: 'users',
    initialState: {
        isLogIn: false,
        userInfor: {},
        page: 0
    },
    reducers: {
        userLogOut(state, action) {
            state.isLogIn = false
            state.userInfor = {}
        },
        handleSetPage(state, action) {
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogIn.fulfilled, (state, action) => {
            state.userInfor = action.payload
            state.isLogIn = true
        })
        builder.addCase(userUpdate.fulfilled, (state, action) => {
            state.userInfor = action.payload
        })
    }
})