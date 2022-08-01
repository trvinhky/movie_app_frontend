import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleLogin, handleUpdateUser } from '../../services/userServices'

export const userLogIn = createAsyncThunk(
    'users/fetchUerLogIn',
    async (infor, thunkAPI) => {
        const { data } = await handleLogin(infor)
        if (data) {
            return data.user
        } else {
            return {}
        }
    }
)

export const userUpdate = createAsyncThunk(
    'users/fetchUerUpdate',
    async (infor, thunkAPI) => {
        const { data } = await handleUpdateUser(infor)
        return data ? data.data : {}
    }
)