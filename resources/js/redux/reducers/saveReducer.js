export const saveReducer = (state = { loading: 0,modal:0 }, action) => {
  switch (action.type) {
    case "INCREMENT_FETCHING": {
      return { ...state, loading: state.loading + 1 }
    }
    case "DECREMENT_FETCHING": {
      return { ...state, loading: state.loading - 1 }
    }
    case "SHOW_MODAL": {
      if(state.modal + 1 > 0) {
        document.body.style.overflow='hidden'
      }
      return { ...state, modal: state.modal + 1 }
    }
    case "HIDE_MODAL": {
      if(state.modal - 1 === 0) {
        document.body.style.overflow='auto'
      }
      return { ...state, modal: state.modal - 1 }
    }
    default: {
      return state
    }
  }
}
