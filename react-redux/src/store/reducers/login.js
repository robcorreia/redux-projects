// Login.js
import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from '../helper/createAsyncSlice';
import getLocalStorage from '../helper/getLocalStorage'

const token = createAsyncSlice({
  name: 'token',
  initialState: {
    data: getLocalStorage('token', null)
  },
  reducers: {
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: 'token',
              value: payload.token
            }
          }
        }
      }
    }
  },
  fetchConfig: (user) => ({
    url: 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  })
})

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: (token) => ({
    url: 'https://dogsapi.origamid.dev/json/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      }
    },
  })
})

const reducer = combineReducers({ token: token.reducer, user: user.reducer })

const fetchToken = token.asyncAction
const fetchUser = user.asyncAction

export default reducer


export const login = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(user))
    if (payload.token) await dispatch(fetchUser(payload.token))
  } catch {

  }
}


export const autoLogin = () => async (dispatch, getState) => {
  const state = getState()
  const token = state.login.token.data
  if (token) await dispatch(fetchUser(token))
}