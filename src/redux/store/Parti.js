import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../@core/auth/jwt/const"


export const getParti = createAsyncThunk('parti/getParti', async() => {
    const response = await client.get('/getAllParti')
    return response.data.data
  })

export const PartiSlice = createSlice({
 name:'parti',
 initialState:{
    data: [],
    status: null
 },
 extraReducers: builder => {
    builder.addCase(getParti.pending, (state) => {
        state.status = 'loading'
        })
    .addCase(getParti.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
        })
    .addCase(getParti.rejected, (state) => {
        state.status = "failed"
      })
 }
})

export default PartiSlice.reducer
