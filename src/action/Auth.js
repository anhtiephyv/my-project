import axios from 'axios'
import * as Types from '../constant/actionType';
import * as callApi from '../ultils/apiCaller';
const ROOT_URL = 'http://localhost:3090';
export function login(loginForm) {
debugger;
  return function (dispatch) {
   dispatch({ type: Types.AUTH_USER });
   localStorage.setItem('token', 'Somevalue')
    // submit email and password to server
    // const request = callApi(`token`, 'POST', { username, password });
    // request.then(response => {
    //     // -Save the JWT token
    //     localStorage.setItem('token', response.data.token)
    //     // -if request is good, we need to update state to indicate user is authenticated
    //     dispatch({ type: Types.AUTH_USER })
    //   })

    //   // If request is bad...
    //   // -Show an error to the user
    //   .catch(() => {
    //     dispatch(authError('bad login info'))
    //   })

  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return {
    type: Types.UNAUTH_USER
  }
}

export function signupUser({ email, password, passwordConfirmation }) {
  return function (dispatch) {
    callApi(`${ROOT_URL}/signup`, { email, password, passwordConfirmation })
      .then(response => {
        dispatch({ type: Types.AUTH_USER })
        localStorage.setItem('token', response.data.token)
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error))
      })
  }
}

export function authError(error) {
  return {
    type: Types.AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: Types.FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
