import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../@core/auth/jwt/const"

export const  getCirconscription = createAsyncThunk('circonscription/getCirconscription', async(id) => {
    const response = await client.get(`/circonscription/${id}`)
    return response.data.data
  })

export const CirconscriptionSlice = createSlice({
    name:'circonscription',
    initialState:{
        data: [],
        status: null
    },
    extraReducers: builder => {
        builder.addCase(getCirconscription.pending, (state) => {
            state.status = 'loading'
            })
        .addCase(getCirconscription.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.data = action.payload
            })
        .addCase(getCirconscription.rejected, (state) => {
            state.status = "failed"
          })
    }
})

export default CirconscriptionSlice.reducer
