import React from 'react'

const styles = {
  outer: {
    height: '100vh',
    overflow: 'hidden',
  },
  inner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}

const Container = ({ children }) => (
  <div style={styles.outer}>
    <div style={styles.inner}>{children}</div>
  </div>
)

export { Container }
