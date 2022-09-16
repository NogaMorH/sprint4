const initialState = {
  // isLoading: false
  // isAddFormOpen: false
  formAdd: {
    groupId: null,
    isAddGroup: false
  },
  modalGroupId: null
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_FORM_ADD_GROUP_ID':
      return { ...state, formAdd: { groupId: action.groupId } }
    case 'SET_FORM_ADD_IS_ADD_GROUP':
      return { ...state, formAdd: { isAddGroup: action.isAddGroup } }
    case 'SET_IS_GROUP_MODAL_OPEN':
      return { ...state, modalGroupId: action.groupId }
    //   case 'LOADING_START':
    //     return { ...state, isLoading: true }
    //   case 'LOADING_DONE':
    //     return { ...state, isLoading: false }
    default: return state
  }
}
