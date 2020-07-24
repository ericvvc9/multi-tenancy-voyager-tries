export const login = (state = { user: undefined }, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: {
        token: action.payload.token
      }}
    }
    case "SET_USER_DATA": {
      return { ...state, user: {
        ...state.user,
        ...action.payload.userData
      }}
    }
    case "LOGOUT": {
      return { ...state, user: undefined}
    }
    
    default: {
      return state
    }
  }
}
