import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../@core/auth/jwt/const"
import { getUserData } from "../../utility/Utils"


export const nombreRepresentant = createAsyncThunk('representant/nombreRepresentant', async(idCandidat) => {
    const response = await client.get(`/NombreRepresentant/${idCandidat}`)
    return response.data.data
  })

export const getRepresentant = createAsyncThunk('representant/getRepresentant', async() => {
    const response = await client.get(`/ListeRepresentatByCandidat/${getUserData().id_candidat}`)
    return response.data
  })

export const Representant = createSlice({
 name:'representant',
 initialState:{
    nombreRepresentant: [],
    representant: [],
    status: null
 },
 extraReducers: builder => {
    builder
    .addCase(nombreRepresentant.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.nombreRepresentant = action.payload
        })
        .addCase(getRepresentant.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.representant = action.payload
          })
        
 }
})

export default Representant.reducer
