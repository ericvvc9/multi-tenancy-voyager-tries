import { history } from "../../../history"
import { request } from "../../../utils"

export const showModal = () => {
  return dispatch => {
    return dispatch({
      type: "SHOW_MODAL"
    })
  }
}

export const hideModal = () => {
  return dispatch => {
    return dispatch({
      type: "HIDE_MODAL"
    })
  }
}