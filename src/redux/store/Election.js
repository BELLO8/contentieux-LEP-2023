/* eslint-disable */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client, urlBase } from "../../@core/auth/jwt/const";
import { getUserData } from "../../utility/Utils";
import axios from "axios";

export const getLieuxVote = createAsyncThunk(
  "lieuxVote/getLieuxVote",
  async () => {
    const response = await client.get(`${urlBase}LieudeVote`, {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getUserData().accessToken}`,
      },
    });
    localStorage.setItem("lv", JSON.stringify(response.data.data));
    return response.data.data;
  }
);

export const getBureauVote = createAsyncThunk(
  "bureauVote/getBureauVote",
  async (idLv) => {
    const response = await client.get(`bureauVote/${idLv}`);
    return response.data.data;
  }
);

export const nombreBV = createAsyncThunk("bv/nombreBureauVote", async () => {
  const response = await client.get(
    `NombreBvByCirconsElectorale/${getUserData().id_circons}/${
      getUserData().id_type_election
    }`
  );
  localStorage.setItem("nombreBV", JSON.stringify(response.data.data));

  return response.data.data;
});

export const nombreLV = createAsyncThunk("lv/nombreLV", async () => {
  const response = await client.get(
    `NombreLvByCirconsElectorale/${getUserData().id_circons}/${
      getUserData().id_type_election
    }`
  );
  localStorage.setItem("nombreLV", JSON.stringify(response.data.data));
  return response.data.data;
});

export const nombreElecteurBv = createAsyncThunk(
  "nbreElectBv/nombreElecteurBv",
  async (id) => {
    const response = await client.get(`NbrPopulationByBv/2020/${id}`);
    return response.data;
  }
);

export const nombreElecteur = createAsyncThunk(
  "nbreElecteur/nombreElecteur",
  async () => {
    const response = await client.get(
      `${urlBase}NombreElecteurByCirconsElectorale/${
        getUserData().id_type_election
      }`,
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getUserData().accessToken}`,
        },
      }
    );
    localStorage.setItem("nombreElecteur", JSON.stringify(response.data.data));
    return response.data.data;
  }
);

export const nombreElecteurByBvBYCircons = createAsyncThunk(
  "NombreElecteurByBvBYCircons/nombreElecteurByBvBYCircons",
  async () => {
    const response = await axios.get(
      `${urlBase}NombreElecteurByBvBYCircons/${getUserData().id_type_election}`,
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getUserData().accessToken}`,
        },
      }
    );
    localStorage.setItem(
      "ElecteurByBvBYCircons",
      JSON.stringify(response.data.data)
    );
    return response.data.data;
  }
);

export const allNombreVotant = createAsyncThunk(
  "AllNombreVotantByBvByCircons/allNombreVotantByBvByCircons",
  async () => {
    const response = await client.get(
      `AllNombreVotantByBvByCircons/${getUserData().id_type_election}`
    );
    return response.data.data;
  }
);

export const nombreVotantGlobal = createAsyncThunk(
  "NombreVotantGlobal/nombreVotantGlobal",
  async () => {
    const response = await client.get(
      `${urlBase}NombreVotantByCirconsElectorale/${
        getUserData().id_type_election
      }`,
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getUserData().accessToken}`,
        },
      }
    );
    return response.data.data;
  }
);

export const nombreVotant = createAsyncThunk(
  "votant/nombrevotant",
  async () => {
    const response = await client.get(
      `AllNombreVotantByBvByCircons/${getUserData().id_type_election}`
    );
    return response.data.data;
  }
);

export const tauxParticipation = createAsyncThunk(
  "taux/tauxParticipation",
  async (params) => {
    const response = await client.get(
      `TauxParticipationByBv/${params.id_bv}/${params.id_type}/${params.id_parti}`
    );
    return response.data.data;
  }
);

export const getElecteurByBv = createAsyncThunk(
  "electeur/getElecteurBv",
  async (params) => {
    const response = await client.get(`getElecteurbyBvCandidat/${params.bv}`);
    return response.data.data;
  }
);

export const getTimeLineByBv = createAsyncThunk(
  "timeLine/getTimeLineByBv",
  async (params) => {
    const response = await client.get(`EtapeElectionByBv/${params.bv}`);
    return response.data.data;
  }
);

export const getTimeLineByCircons = createAsyncThunk(
  "timeLineByCircons/getTimeLineByCircons",
  async () => {
    const response = await client.get(
      `EtapeBvByCirconsElectorale/${getUserData().id_type_election}`
    );
    return response.data.data;
  }
);

export const getElecteurVotant = createAsyncThunk(
  "votant/getElecteurVotant",
  async (params) => {
    const response = await client.get(
      `ListeElecteurVoteBv/${params.id_bv}/${getUserData().id_type_election}/${
        getUserData().id_parti
      }`
    );
    return response.data.data;
  }
);

export const getElecteurByCommune = createAsyncThunk(
  "electeurbycommune/getElecteurByCommune",
  async (params) => {
    const response = await client.get(
      `electeurbycommune/2023/${params.idCom}/${params.idCand}/?page=${
        params.page === undefined ? 1 : params.page
      }`
    );
    return response.data.data;
  }
);

export const getElecteurByLieuVote = createAsyncThunk(
  "electeurbyLieuVote/getElecteurByLieuVote",
  async (params) => {
    const response = await client.get(
      `electeurbyLieuVote/2023/${params.idLv}/${params.idCand}/?page=${
        params.page === undefined ? 1 : params.page
      }`
    );
    return response.data.data;
  }
);

export const getCandidats = createAsyncThunk(
  "Candidats/getCandidats",
  async () => {
    const response = await axios.get(`${urlBase}listCandidatByCircons`, {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getUserData().accessToken}`,
      },
    });
    localStorage.setItem("candidats", JSON.stringify(response.data.data));
    return response.data.data;
  }
);

export const getCandidatsVoiceByDep = createAsyncThunk(
  "depouille/getCandidatsVoice",
  async () => {
    const response = await client.get("DepouillementByBvByCirconsElectorale");
    return response.data.data;
  }
);

export const getNombreBvEtapeEnCours = createAsyncThunk(
  "NombreEtapeEnCoursEtTermine/NombreEtapeEnCours",
  async () => {
    const response = await axios.get(
      `${urlBase}NombreEtapeEnCoursEtTermineByCircons`,
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getUserData().accessToken}`,
        },
      }
    );
    return response.data.data;
  }
);

export const getAllEtapeBv = createAsyncThunk(
  "etape/getAllEtapeBv",
  async () => {
    const response = await client.get("AllEtape");
    return response.data.data;
  }
);

export const getListBvConforme = createAsyncThunk(
  "listBvConforme/getListBvConforme",
  async () => {
    const response = await client.get("ListBvConformeNonConforme");
    return response.data.data;
  }
);

export const getResult = createAsyncThunk(
  "result/getResult",
  async (params) => {
    const response = await axios.get(
      `${urlBase}ResultatGlobal/${params.id_circons}/${params.id_parti}/${params.type}`,
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getUserData().accessToken}`,
        },
      }
    );
    return response.data.data;
  }
);

export const RegisterCandidant = createAsyncThunk(
  "registerCandidant/register",
  async (data) => {
    const response = await client.post("RegisterCandidat", data);
    return response.data;
  }
);

export const ElectionSlice = createSlice({
  name: "election",
  initialState: {
    status: null,
    lieuxVote: [],
    CandidatsVoice: [],
    listBvConforme: [],
    timeLine: [],
    NombreEtapeEnCoursEtTermineByCircons: [],
    timeLineCircons: [],
    nbrLv: [],
    nombreElecteur: [],
    nombreVotantGlobal: [],
    bureauVote: [],
    etape: [],
    nbrBv: [],
    nbrVotant: [],
    nbreElectBv: [],
    nombreElecteurByBv: [],
    allNombreVotantByBvByCircons: [],
    votants: [],
    electeurBv: [],
    Listvotants: [],
    voix: [],
    taux: [],
    candidats: [],
    resultat: [],
  },
  reducers: {
    vote: (state, action) => {
      state.votants.unshift(action.payload);
    },
    voice: (state, action) => {
      state.voix = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLieuxVote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lieuxVote = action.payload;
      })
      .addCase(getBureauVote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bureauVote = action.payload;
      })
      .addCase(getListBvConforme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listBvConforme = action.payload;
      })
      .addCase(nombreBV.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbrBv = action.payload;
      })
      .addCase(getNombreBvEtapeEnCours.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.NombreEtapeEnCoursEtTermineByCircons = action.payload;
      })
      .addCase(nombreLV.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbrLv = action.payload;
      })
      .addCase(nombreElecteurBv.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbreElectBv = action.payload;
      })
      .addCase(getAllEtapeBv.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.etape = action.payload;
      })
      .addCase(nombreVotant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbrVotant = action.payload;
      })
      .addCase(getElecteurVotant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Listvotants = action.payload;
      })
      .addCase(getCandidatsVoiceByDep.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.CandidatsVoice = action.payload;
      })
      .addCase(tauxParticipation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taux = action.payload;
      })
      .addCase(getCandidats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidats = action.payload;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.resultat = action.payload;
      })
      .addCase(nombreElecteur.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nombreElecteur = action.payload;
      })
      .addCase(nombreVotantGlobal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nombreVotantGlobal = action.payload;
      })
      .addCase(nombreElecteurByBvBYCircons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nombreElecteurByBv = action.payload;
      })
      .addCase(getElecteurByBv.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.electeurBv = action.payload;
      })
      .addCase(getTimeLineByBv.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.timeLine = action.payload;
      })
      .addCase(getTimeLineByCircons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.timeLineCircons = action.payload;
      })
      .addCase(allNombreVotant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allNombreVotantByBvByCircons = action.payload;
      });
  },
});

export const { vote, voice } = ElectionSlice.actions;

export default ElectionSlice.reducer;
