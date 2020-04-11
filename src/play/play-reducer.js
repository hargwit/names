import { useReducer, useEffect } from 'react'

const actionTypes = {
  newName: 'NEW_NAME',
  pass: 'PASS',
  unPass: 'UN_PASS',
}

const initialState = {
  currentName: '',
  currentPass: '',
  completedNames: [],
  nextName: '',
}

function playReducer(state, action) {
  switch (action.type) {
    case actionTypes.newName:
      if (state.nextName) {
        return {
          ...state,
          currentName: state.nextName,
          nextName: '',
          completedNames: [...state.completedNames, state.currentName],
        }
      } else {
        const nextCompletedNames = state.currentName
          ? [...state.completedNames, state.currentName]
          : state.completedNames
        const nextName = chooseRandomName(
          action.gameNames,
          nextCompletedNames,
          state.currentPass,
        )

        return {
          ...state,
          currentName: nextName ? nextName : state.currentPass,
          completedNames: nextCompletedNames,
          currentPass: nextName ? state.currentPass : '',
        }
      }
    case actionTypes.pass:
      return {
        ...state,
        currentPass: state.currentName,
        currentName: state.nextName
          ? state.nextName
          : chooseRandomName(
              action.gameNames,
              state.completedNames,
              state.currentName,
            ),
        nextName: '',
      }
    case actionTypes.unPass:
      return {
        ...state,
        currentName: state.currentPass,
        currentPass: '',
        nextName: state.currentName,
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

  return {
    ...state,
    setNewName,
    passName,
    unPassName,
  }
}

function chooseRandomName(names, completedNames, currentPass) {
  const availableNames = names
    .filter((name) => !completedNames.includes(name))
    .filter((name) => name !== currentPass)

  if (availableNames.length === 0) {
    return ''
  }

  const index = Math.floor(Math.random() * Math.floor(availableNames.length))
  return availableNames[index]
}

export { usePlay }
