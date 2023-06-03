import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../@core/auth/jwt/const"

export const getCandidatInfo = createAsyncThunk('candidatInfo/getCandidatInfo', async params => {
    const response = await client.get(`/candidat_info/${params.idTypeElection}/${params.idcirconscription}`)
    return response.data.data
  })

export const CandidatInfoSlice = createSlice({
    name:'candidatInfo',
    initialState:{
        data: [],
        status: null
    },
    reducers:{
        Register: (state, action) => {
            state.user = action.payload
            }
    },
    extraReducers: builder => {
        builder.addCase(getCandidatInfo.pending, (state) => {
            state.status = 'loading'
            })
        .addCase(getCandidatInfo.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.data = action.payload
            })
        .addCase(getCandidatInfo.rejected, (state) => {
            state.status = "failed"
          })
    }
})

export const {Register} = CandidatInfoSlice.actions

export default CandidatInfoSlice.reducer
