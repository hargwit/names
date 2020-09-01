import { newName, pass, unPass, undo, initialState } from './play-reducer'
import faker from 'faker'

test('newName reducer - no current name', () => {
  const state = initialState

  const gameNames = [
    {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
  ]

  const actual = newName(state, { gameNames })

  const expected = {
    ...state,
    currentName: gameNames[0],
  }

  expect(actual).toStrictEqual(expected)
})

test('newName reducer - complete current name', () => {
  const state = {
    ...initialState,
    currentName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
  }

  const gameNames = [
    {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
    state.currentName,
  ]

  const actual = newName(state, { gameNames })

  const expected = {
    ...state,
    currentName: gameNames[0],
    completedNames: [state.currentName],
  }

  expect(actual).toStrictEqual(expected)
})

test('newName reducer - complete last name with pass', () => {
  const state = {
    ...initialState,
    currentName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
    currentPass: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
  }

  const gameNames = [state.currentName, state.currentPass]

  const actual = newName(state, { gameNames })

  const expected = {
    ...state,
    currentName: state.currentPass,
    completedNames: [state.currentName],
    currentPass: {},
  }

  expect(actual).toStrictEqual(expected)
})

test('newName reducer - complete current name with next name', () => {
  const state = {
    ...initialState,
    currentName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
    nextName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
  }

  const gameNames = [state.currentName, state.nextName]

  const actual = newName(state, { gameNames })

  const expected = {
    ...state,
    currentName: state.nextName,
    completedNames: [state.currentName],
    currentPass: {},
    nextName: {},
  }

  expect(actual).toStrictEqual(expected)
})

test('pass - without next name', () => {
  const state = {
    ...initialState,
    currentName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
  }

  const gameNames = [
    {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
    ,
    state.currentName,
  ]

  const actual = pass(state, { gameNames })

  const expected = {
    ...state,
    currentName: gameNames[0],
    currentPass: state.currentName,
  }

  expect(actual).toStrictEqual(expected)
})

test('pass - with next name', () => {
  const state = {
    ...initialState,
    currentName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
    nextName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
  }

  const gameNames = [state.nextName, state.currentName]

  const actual = pass(state, { gameNames })

  const expected = {
    ...state,
    currentName: state.nextName,
    currentPass: state.currentName,
    nextName: {},
  }

  expect(actual).toStrictEqual(expected)
})

test('unPass', () => {
  const state = {
    ...initialState,
    currentName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
    currentPass: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
  }

  const actual = unPass(state)

  const expected = {
    ...state,
    currentName: state.currentPass,
    nextName: state.currentName,
    currentPass: {},
  }

  expect(actual).toStrictEqual(expected)
})

test('undo', () => {
  const state = {
    ...initialState,
    currentName: {
      id: faker.random.number(),
      value: faker.name.findName(),
    },
    completedNames: [
      {
        id: faker.random.number(),
        value: faker.name.findName(),
      },
    ],
  }

  const actual = undo(state)

  const expected = {
    ...state,
    currentName: state.completedNames[0],
    completedNames: [],
  }

  expect(actual).toStrictEqual(expected)
})
