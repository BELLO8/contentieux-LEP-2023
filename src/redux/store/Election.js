import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../@core/auth/jwt/const"


export const getDepartement = createAsyncThunk('departement/getDepartement', async(idRegion) => {
    const response = await client.get(`departements/2023/${idRegion}`)
    return response.data.data
  })

  export const getCirconscriptionAdmin = createAsyncThunk('circonscriptionAdmin/getCirconscriptionAdmin', async(idCodDep) => {
    const response = await client.get(`circonscriptionAdmin/2023/${idCodDep}`)
    return response.data.data
  })

  export const getLieuxVote = createAsyncThunk('lieuxVote/getLieuxVote', async(idCircons) => {
    const response = await client.get(`LieudeVote/2023/${idCircons}`)
    return response.data.data
  })

//   export const getLieuxVoteCirconscription = createAsyncThunk('lieuxVoteCirconscription/getLieuxVoteCirconscription', async(idCircons) => {
//     const response = await client.get(`LieudeVote/2023/${idCircons}`)
//     return response.data.data
//   })

  export const getBureauVote = createAsyncThunk('bureauVote/getBureauVote', async(idLv) => {
    const response = await client.get(`bureauVote/${idLv}`)
    return response.data.data
  })

  export const getElecteur = createAsyncThunk('electeur/getElecteur', async(params) => {
    const response = await client.get(
        `electeurbydep/2023/${params.idDep}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })

  export const getElecteurByCommune = createAsyncThunk('electeurbycommune/getElecteurByCommune', async(params) => {
    const response = await client.get(
        `electeurbycommune/2023/${params.idCom}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })

  export const getElecteurByLieuVote = createAsyncThunk('electeurbyLieuVote/getElecteurByLieuVote', async(params) => {
    const response = await client.get(
        `electeurbyLieuVote/2023/${params.idLv}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })


  export const getElecteurDecedeByDep = createAsyncThunk('electeurDecedeByDep/getElecteurDecedeByDep', async(params) => {
    const response = await client.get(
        `electeurDecedebyDep/${params.idDep}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })

  export const getElecteurDecedeByCom = createAsyncThunk('electeurDecedeByCom/getElecteurDecedeByCom', async(params) => {
    const response = await client.get(
        `electeurDecedebyCommune/${params.idCom}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })
  
  export const getElecteurDecedeByLv = createAsyncThunk('electeurDecedeByLv/getElecteurDecedeByLv', async(params) => {
    const response = await client.get(
        `electeurDecedebyLieuvote/${params.idLv}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })


  export const getElecteurContentieux = createAsyncThunk('electeurContentieux/getElecteurContentieux', async(params) => {
    const response = await client.get(
        `${params.url}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })

  export const getElecteurInformationManquante = createAsyncThunk('electeurInformationManquante/getElecteurInformationManquante', async(params) => {
    const response = await client.get(
        `${params.url}/${params.id}/${params.idCand}/?page=${
          params.page === null ? 1 : params.page
        }`
      )
    return response.data.data
  })

export const ElectionSlice = createSlice({
    name:'election',
    initialState:{
        status: null,
        departement: [],
        commune: [],
        lieuxVote: [],
        electeur:[],
        bureauVote: [],
        electeurDecede: [],
        electeurInfo: []
    },
    reducers:{
        clearStore: (state) => {
            state.electeur = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getDepartement.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.departement = action.payload
            })
            .addCase(getCirconscriptionAdmin.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.commune = action.payload
                })
            .addCase(getLieuxVote.fulfilled, (state, action) => {
                    state.status = "succeeded"
                    state.lieuxVote = action.payload
                    })
            .addCase(getElecteur.fulfilled, (state, action) => {
                        state.status = "succeeded"
                        state.electeur = action.payload
                    })
            .addCase(getElecteurByCommune.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeur = action.payload
            })
            .addCase(getElecteurByLieuVote.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeur = action.payload
            })
            .addCase(getBureauVote.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.bureauVote = action.payload
            })
            .addCase(getElecteurDecedeByDep.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeurDecede = action.payload
            })
            .addCase(getElecteurDecedeByCom.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeurDecede = action.payload
            })
            .addCase(getElecteurDecedeByLv.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeurDecede = action.payload
            })
            .addCase(getElecteurContentieux.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeurInfo = action.payload
            })
            .addCase(getElecteurInformationManquante.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeur = action.payload
            })
    }
})

export const {clearStore} = ElectionSlice.actions

export default ElectionSlice.reducer