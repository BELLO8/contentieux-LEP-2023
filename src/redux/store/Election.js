/* eslint-disable */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../@core/auth/jwt/const";

export const getLieuxVote = createAsyncThunk(
  "lieuxVote/getLieuxVote",
  async (idCircons) => {
    const response = await client.get(`LieudeVote/2023/${idCircons}`);
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

export const nombreBV = createAsyncThunk(
  "bv/nombreBureauVote",
  async (params) => {
    const response = await client.get(
      `NombreBvByCirconsElectorale/${params.idcircons}/${params.type_election}`
    );
    return response.data.data;
  }
);

export const nombreLV = createAsyncThunk("lv/nombreLV", async (params) => {
  const response = await client.get(
    `NombreLvByCirconsElectorale/${params.idcircons}/${params.type_election}`
  );
  return response.data.data;
});

export const nombreElecteurBv = createAsyncThunk(
  "nbreElectBv/nombreElecteurBv",
  async (id) => {
    const response = await client.get(`NbrPopulationByBv/2020/${id}`);
    return response.data;
  }
);

export const nombreVotant = createAsyncThunk(
  "votant/nombrevotant",
  async (params) => {
    const response = await client.get(
      `ElecteurVotant/${params.id_bv}/${params.id_type}/${params.id_parti}`
    );
    return response.data;
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

export const getElecteur = createAsyncThunk(
  "electeur/getElecteur",
  async (params) => {
    const response = await client.get(
      `${params.uri}/${params.id}/${params.idCand}/?page=${
        params.page === undefined ? 1 : params.page
      }`
    );
    return response.data.data;
  }
);

export const getElecteurVotant = createAsyncThunk(
  "votant/getElecteurVotant",
  async (params) => {
    const response = await client.get(
      `ListeElecteurVoteBv/${params.id_bv}/${params.id_type}/${params.parti}`
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
  async (params) => {
    const response = await client.get(
      `ListCandidatByBv/${params.bv}/${params.type}`
    );
    return response.data.data;
  }
);

export const getResult = createAsyncThunk(
  "result/getResult",
  async (params) => {
    const response = await client.get(
      `ResultatGlobal/${params.id_circons}/${params.id_parti}/${params.type}`
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
    nbrLv: [],
    bureauVote: [],
    nbrBv: [],
    nbrVotant: [],
    nbreElectBv: [],
    votants: [],
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
      .addCase(nombreBV.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbrBv = action.payload;
      })
      .addCase(nombreLV.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbrLv = action.payload;
      })
      .addCase(nombreElecteurBv.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbreElectBv = action.payload;
      })
      .addCase(nombreVotant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nbrVotant = action.payload;
      })
      .addCase(getElecteurVotant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Listvotants = action.payload;
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
      });
  },
});

export const { vote, voice } = ElectionSlice.actions;

export default ElectionSlice.reducer;
