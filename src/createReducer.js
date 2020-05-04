export default function createReducer(actionMapping) {
  return function (state, action) {
    if (actionMapping[action.type] === undefined) {
      throw new Error(`Unknown action type ${action.type}`)
    }

    return actionMapping[action.type](state, action)
  }
}
