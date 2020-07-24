import { history } from "../../../history"
import { request } from "../../../utils"

export const submitLogin = ({access_token, remember}) => {
  return dispatch => {
    return dispatch({
      type: "LOGIN",
      payload: {
        token: access_token
      }
    })
  }
}

export const setUserData = (userData) => {
  return dispatch => {
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        userData: userData
      }
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: "LOGOUT"
    })
  }
}
