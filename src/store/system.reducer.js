const initialState = {
  // isLoading: false
  // isAddFormOpen: false
  formAdd: {
    groupId: null,
    isAddGroup: false
  },
  modalGroupId: null,
  titleGroupId: null,
  modalTaskId: null,
  titleTaskId: null
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_FORM_ADD_GROUP_ID':
      return { ...state, formAdd: { ...state.formAdd, groupId: action.groupId } }
    case 'SET_FORM_ADD_IS_ADD_GROUP':
      return { ...state, formAdd: { ...state.formAdd, isAddGroup: action.isAddGroup } }
    case 'SET_MODAL_GROUP_ID':
      return { ...state, modalGroupId: action.groupId }
    case 'SET_TITLE_GROUP_ID':
      return { ...state, titleGroupId: action.groupId }
    case 'SET_MODAL_TASK_ID':
      return { ...state, modalTaskId: action.taskId }
      case 'SET_TITLE_TASK_ID':
        return { ...state, titleTaskId: action.taskId }
    //   case 'LOADING_START':
    //     return { ...state, isLoading: true }
    //   case 'LOADING_DONE':
    //     return { ...state, isLoading: false }
    default: return state
  }
}
