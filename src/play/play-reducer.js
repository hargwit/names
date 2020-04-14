import { useReducer } from 'react'

const actionTypes = {
  newName: 'NEW_NAME',
  pass: 'PASS',
  unPass: 'UN_PASS',
  undo: 'UNDO',
}

const initialState = {
  currentName: {},
  currentPass: {},
  completedNames: [],
  nextName: {},
}

function playReducer(state, action) {
  switch (action.type) {
    case actionTypes.newName:
      if (state.nextName.value) {
        return {
          ...state,
          currentName: state.nextName,
          nextName: {},
          completedNames: [...state.completedNames, state.currentName],
        }
      } else {
        const nextCompletedNames = state.currentName.id
          ? [...state.completedNames, state.currentName]
          : state.completedNames
        const nextName = chooseRandomName(
          action.gameNames,
          nextCompletedNames,
          state.currentPass,
        )

        return {
          ...state,
          currentName: nextName.id ? nextName : state.currentPass,
          completedNames: nextCompletedNames,
          currentPass: nextName.id ? state.currentPass : {},
        }
      }
    case actionTypes.pass:
      return {
        ...state,
        currentPass: state.currentName,
        currentName: state.nextName.id
          ? state.nextName
          : chooseRandomName(
              action.gameNames,
              state.completedNames,
              state.currentName,
            ),
        nextName: {},
      }
    case actionTypes.unPass:
      return {
        ...state,
        currentName: state.currentPass,
        currentPass: {},
        nextName: state.currentName,
      }
    case actionTypes.undo: {
      return {
        ...state,
        currentName: state.completedNames[state.completedNames.length - 1],
        completedNames: state.completedNames.slice(
          0,
          state.completedNames.length - 1,
        ),
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const usePlay = (gameNames) => {
  const [state, dispatch] = useReducer(playReducer, initialState)

  const setNewName = () => dispatch({ gameNames, type: actionTypes.newName })
  const passName = () => dispatch({ gameNames, type: actionTypes.pass })
  const unPassName = () => dispatch({ type: actionTypes.unPass })
  const undo = () => dispatch({ type: actionTypes.undo })

  return {
    currentPass: state.currentPass.value,
    currentName: state.currentName.value,
    nextName: state.nextName.value,
    completedNames: state.completedNames,
    setNewName,
    passName,
    unPassName,
    undo,
  }
}

function chooseRandomName(names, completedNames, currentPass) {
  const availableNames = names
    .filter((name) => !completedNames.find((n) => n.id === name.id))
    .filter((name) => name.id !== currentPass.id)

  if (availableNames.length === 0) {
    return {}
  }

  const index = Math.floor(Math.random() * Math.floor(availableNames.length))
  return availableNames[index]
}

export { usePlay }
