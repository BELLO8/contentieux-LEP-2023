import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../@core/auth/jwt/const"


export const getTypeElection = createAsyncThunk('typeElection/getTypeElection', async() => {
    const response = await client.get('/typeElection')
    return response.data.data
  })

export const TypeElectionSlice = createSlice({
 name:'typeElection',
 initialState:{
    data: [],
    status: null
 },
 extraReducers: builder => {
    builder.addCase(getTypeElection.pending, (state) => {
        state.status = 'loading'
        })
    .addCase(getTypeElection.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
        })
    .addCase(getTypeElection.rejected, (state) => {
        state.status = "failed"
      })
 }
})

export default TypeElectionSlice.reducer
