// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
//import useJwt from '../@core/auth/jwt/useJwt'

//const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem('userProfil')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userProfil: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userProfil = action.payload
      state["accessToken"] = action.payload["accessToken"]
      state["refreshToken"] = action.payload["refreshToken"]
      localStorage.setItem('userProfil', JSON.stringify(action.payload))
      localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
      localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken))
    },
    handleLogout: state => {
      state.userData = {}
      state["accessToken"] = null
      state["refreshToken"] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userProfil')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
