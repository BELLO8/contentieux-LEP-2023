import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../@core/auth/jwt/const"


export const getDepartement = createAsyncThunk('departement/getDepartement', async(idRegion) => {
    const response = await client.get(`departements/2023/${idRegion}`)
    return response.data.data
  })

export const changeRegionByRegion = createAsyncThunk('ChangeRegionByRegion/changeRegionByRegion', async(params) => {
    const response = await client.get(`changeRegionByRegion/${params.idRegion}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })

  export const changeRegionByCommune = createAsyncThunk('ChangeRegionByCommune/changeRegionByCommune', async(params) => {
    const response = await client.get(`changeRegionByCommune/${params.idCom}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })

  export const conservRegionChangeDepByRegion = createAsyncThunk('ConservRegionChangeDepByRegion/conservRegionChangeDepByRegion', async(params) => {
    const response = await client.get(`conservRegionChangeDepByRegion/${params.idRegion}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })

  export const conservRegionChangeDepByCommune = createAsyncThunk('ConservRegionChangeDepByCommune/conservRegionChangeDepByCommune', async(params) => {
    const response = await client.get(`conservRegionChangeDepByCommune/${params.idCom}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })


  export const newinscritbyRegion = createAsyncThunk('NewinscritbyRegion/newinscritbyRegion', async(params) => {
    const response = await client.get(`newinscritbyRegion/${params.idRegion}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })

   export const newinscritbyCircons = createAsyncThunk('NewinscritbyCircons/newinscritbyCircons', async(params) => {
    const response = await client.get(`newinscritbyCircons/${params.idCom}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })
  
  export const electeurCentenaireByRegion = createAsyncThunk('ElecteurCentenaireByRegion/electeurCentenaireByRegion', async(params) => {
    const response = await client.get(`electeurCentenaireByRegion/${params.idRegion}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })
  export const electeurCentenaireByCommune = createAsyncThunk('ElecteurCentenaireByCommune/electeurCentenaireByCommune', async(params) => {
    const response = await client.get(`electeurCentenaireByCommune/${params.idCom}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })
  
  export const electeurMineurByRegion = createAsyncThunk('ElecteurMineurByRegion/electeurMineurByRegion', async(params) => {
    const response = await client.get(`electeurMineurByRegion/${params.idRegion}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })
  export const electeurMineurByCommune = createAsyncThunk('ElecteurMineurByCommune/electeurMineurByCommune', async(params) => {
    const response = await client.get(`electeurMineurByCommune/${params.idCom}/?page=${
      params.page === null ? 1 : params.page
    }`)
    return response.data.data
  })

  
export const getDoublons = createAsyncThunk('doublons/getDoublons', async(idRegion) => {
    const response = await client.get(`doublon/${idRegion}`)
    return response.data.data
  })

export const doublonbycommune = createAsyncThunk('Doublonbycommune/doublonbycommune', async(idcom) => {
    const response = await client.get(`doublonbycommune/${idcom}`)
    return response.data.data
  })

export const getDepartementParAnnee = createAsyncThunk('departementParAnne/getDepartementParAnnee', async(params) => {
    const response = await client.get(`departements/${params.annee}/${params.idRegion}`)
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

  export const showElecteur = createAsyncThunk('electeur/showElecteur', async(data) => {
    const response = await client.post('electeurInfo', data)
    return response.data
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

  export const AjoutElecteurContentieux = createAsyncThunk('AddContentieux/AjoutElecteurContentieux', async(data) => {
      const response = await client.post('ajoutElecteurContentieux', data)
      return response.data
  })

  export const NbrCirconsDep = createAsyncThunk('nbrCirconsDep/NbrCirconsDep', async(params) => {
    const response = await client.get(`NbrCirconsbyDep/2023/${params.idDep}`)
    return response.data
})

export const NbrCirconsDep20 = createAsyncThunk('nbrCirconsDep20/NbrCirconsDep20', async(params) => {
  const response = await client.get(`NbrCirconsbyDep/2020/${params.idDep}`)
  return response.data
})

export const EvolutionPopulationByDep = createAsyncThunk('evolutionPopulationByDep/EvolutionPopulationByDep', async(params) => {
  const response = await client.get(`evolutionPopulationByDep/${params.idDep}`)
  return response.data
})

export const EvolutionCirconsByDep = createAsyncThunk('evolutionCirconsByDep/EvolutionCirconsByDep', async(params) => {
  const response = await client.get(`evolutionCirconsByDep/${params.idDep}`)
  return response.data
})

export const EvolutionPopulationBylieuVote = createAsyncThunk('evolutionCirconsByDep/EvolutionPopulationBylieuVote', async(params) => {
  const response = await client.get(`evolutionPopulationBylieuVote/${params.idLv}`)
  return response.data
})

export const EvolutionLVByDep = createAsyncThunk('evolutionLVByDep/EvolutionLVByDep', async(params) => {
  const response = await client.get(`evolutionLVByDep/${params.idDep}`)
  return response.data
})

export const NbrPopulationByDep23 = createAsyncThunk('nbrPopulationByDep23/NbrPopulationByDep23', async(params) => {
  const response = await client.get(`NbrPopulationByDep/2023/${params.idDep}`)
  return response.data
})

export const NbrPopulationByDep20 = createAsyncThunk('nbrPopulationByDep20/NbrPopulationByDep20', async(params) => {
  const response = await client.get(`NbrPopulationByDep/2020/${params.idDep}`)
  return response.data
})

export const NbrLieuVotebyCircons20 = createAsyncThunk('nbrLieuVotebyCircons20/NbrLieuVotebyCircons20', async(params) => {
  const response = await client.get(`NbrLieuVotebyDep/2020/${params.idDep}`)
  return response.data
})

export const NbrLieuVotebyCircons23 = createAsyncThunk('nbrLieuVotebyCircons23/NbrLieuVotebyCircons23', async(params) => {
  const response = await client.get(`NbrLieuVotebyDep/2023/${params.idDep}`)
  return response.data
})

export const NbrPopulationByLieuVote20 = createAsyncThunk('nbrPopulationByLieuVote20/NbrPopulationByLieuVote20', async(params) => {
  const response = await client.get(`NbrPopulationByLieuVote/2020/${params.idLv}`)
  return response.data
})

export const NbrPopulationByLieuVote23 = createAsyncThunk('nbrPopulationByLieuVote23/NbrPopulationByLieuVote23', async(params) => {
  const response = await client.get(`NbrPopulationByLieuVote/2023/${params.idLv}`)
  return response.data
})


export const ElectionSlice = createSlice({
    name:'election',
    initialState:{
        status: null,
        departement: [],
        commune: [],
        lieuxVote: [],
        electeur:[],
        Electeur:[],
        bureauVote: [],
        electeurDecede: [],
        electeurdoublons: [],
        electeurInfo: [],
        showElecteur: [],
        synthese:[],
        synthese20:[],
        evolution: [],
        conservRegionChangeDepByRegion:[],
        evolutionCirconsByDep:[],
        nbrPopulationByDep23:[],
        nbrPopulationByDep20:[],
        nbrLieuVotebyCircons20:[],
        nbrLieuVotebyCircons23:[],
        evolutionLVByDep:[],
        evolutionPopulationBylieuVote:[],
        newinscritbyRegion:[],
        electeurMineurByRegion:[],
        electeurCentenaireByRegion:[],
        nbrPopulationByLieuVote23:[],
        nbrPopulationByLieuVote20:[]
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
            .addCase(getDoublons.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.electeurdoublons = action.payload
          })
          .addCase(doublonbycommune.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.electeurdoublons = action.payload
        })
          .addCase(changeRegionByRegion.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.Electeur = action.payload
          })
          .addCase(changeRegionByCommune.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.Electeur = action.payload
        })
            .addCase(getElecteurContentieux.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeurInfo = action.payload
            })
            .addCase(getElecteurInformationManquante.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.electeur = action.payload
            })
            .addCase(showElecteur.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.showElecteur = action.payload
            })
            .addCase(getDepartementParAnnee.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.departement = action.payload
          })
          .addCase(NbrCirconsDep.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.synthese = action.payload
          })
          .addCase(NbrCirconsDep20.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.synthese20 = action.payload
          })
          .addCase(EvolutionPopulationByDep.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.evolution = action.payload
            })
          .addCase(EvolutionCirconsByDep.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.evolutionCirconsByDep = action.payload
          })
          .addCase(EvolutionLVByDep.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.evolutionLVByDep = action.payload
        })
        .addCase(EvolutionPopulationBylieuVote.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.evolutionPopulationBylieuVote = action.payload
      })
        .addCase(NbrPopulationByDep20.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.nbrPopulationByDep20 = action.payload
          })
            .addCase(NbrPopulationByDep23.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.nbrPopulationByDep23 = action.payload
          })
          .addCase(NbrLieuVotebyCircons20.fulfilled, (state, action) => {
              state.status = "succeeded"
              state.nbrLieuVotebyCircons20 = action.payload
          })
          .addCase(NbrLieuVotebyCircons23.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.nbrLieuVotebyCircons23 = action.payload
        })
        .addCase(NbrPopulationByLieuVote23.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.nbrPopulationByLieuVote23 = action.payload
      })
      .addCase(NbrPopulationByLieuVote20.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.nbrPopulationByLieuVote20 = action.payload
        })
        .addCase(conservRegionChangeDepByRegion.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.conservRegionChangeDepByRegion = action.payload
      })
      .addCase(conservRegionChangeDepByCommune.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.conservRegionChangeDepByRegion = action.payload
         })
      .addCase(newinscritbyRegion.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.newinscritbyRegion = action.payload
      })
      .addCase(newinscritbyCircons.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.newinscritbyRegion = action.payload
    })
      .addCase(electeurCentenaireByRegion.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.electeurCentenaireByRegion = action.payload
    })
    .addCase(electeurCentenaireByCommune.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.electeurCentenaireByRegion = action.payload
  })
    .addCase(electeurMineurByRegion.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.electeurMineurByRegion = action.payload
      })
      .addCase(electeurMineurByCommune.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.electeurMineurByRegion = action.payload
        })
      
    }
})

export const {clearStore} = ElectionSlice.actions

export default ElectionSlice.reducer