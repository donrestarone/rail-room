const initialState = {
  darkMode: false,
  isApiDown: true
}

export const reducer = (state = initialState, action) => {
  let actionType = action.type
  switch(actionType) {
    case 'toggleNightModeStatus':
      return {
        ...state, 
        darkMode: !state.darkMode 
      }
    case 'toggleApiStatus':
      return {
        ...state, 
        isApiDown: !state.isApiDown 
      }
    default:
      return state
  }
}