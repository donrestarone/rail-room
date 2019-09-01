const initialState = {
  darkMode: false
}

export const reducer = (state = initialState, action) => {
  let actionType = action.type
  switch(actionType) {
    case 'toggleNightModeStatus':
      return {
        ...state, 
        darkMode: !state.darkMode 
      }
    default:
      return state
  }
}