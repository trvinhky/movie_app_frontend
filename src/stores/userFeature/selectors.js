import userSlice from './slice'

export const { userLogOut, handleSetPage } = userSlice.actions

export const selectUserInfor = (state) => state.users.userInfor
export const selectIsLogIn = (state) => state.users.isLogIn
export const selectPage = (state) => state.users.page