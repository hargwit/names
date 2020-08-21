import { useReducer } from 'react'
import createReducer from 'vanilla-create-reducer'

const actionTypes = {
  newName: 'NEW_NAME',
  pass: 'PASS',
  unPass: 'UN_PASS',
  undo: 'UNDO',
}

export const initialState = {
  currentName: {},
  currentPass: {},
  completedNames: [],
  nextName: {},
}

export function newName(state, { gameNames }) {
  if (state.nextName.value) {
    return {
      ...state,
      currentName: state.nextName,
      nextName: {},
      completedNames: [...state.completedNames, state.currentName],
    }
  }
  const nextCompletedNames = state.currentName.id
    ? [...state.completedNames, state.currentName]
    : state.completedNames
  const nextName = chooseRandomName(
    gameNames,
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

export function pass(state, { gameNames }) {
  return {
    ...state,
    currentPass: state.currentName,
    currentName: state.nextName.id
      ? state.nextName
      : chooseRandomName(gameNames, state.completedNames, state.currentName),
    nextName: {},
  }
}

export function unPass(state) {
  return {
    ...state,
    currentName: state.currentPass,
    currentPass: {},
    nextName: state.currentName,
  }
}

export function undo(state) {
  return {
    ...state,
    currentName: state.completedNames[state.completedNames.length - 1],
    completedNames: state.completedNames.slice(
      0,
      state.completedNames.length - 1,
    ),
  }
}

const reducer = createReducer({
  [actionTypes.newName]: newName,
  [actionTypes.pass]: pass,
  [actionTypes.unPass]: unPass,
  [actionTypes.undo]: undo,
})

const usePlay = (gameNames) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setNewName = () => dispatch({ gameNames, type: actionTypes.newName })
  const passName = () => dispatch({ gameNames, type: actionTypes.pass })
  const unPassName = () => dispatch({ type: actionTypes.unPass })
  const undo = () => dispatch({ type: actionTypes.undo })

  return {
    currentPass: state.currentPass.value,
    currentName: state.currentName,
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
