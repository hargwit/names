import React, { createContext, useContext, useState, useEffect } from 'react'

const ErrorContext = createContext()

function ErrorProvider({ children }) {
  const [error, setError] = useState()

  function clearError() {
    setError('')
  }

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  )
}

const useSafeError = () => {
  const value = useContext(ErrorContext)
  if (!value) {
    throw new Error('useSafeError must be used within an ErrorProvider')
  }

  return value
}

const useError = ({ clear } = {}) => {
  const value = useSafeError()
  const { clearError } = value

  useEffect(() => {
    return () => {
      if (clear) {
        clearError()
      }
    }
  }, [clear, clearError])

  return value
}

export { ErrorProvider, useError }
