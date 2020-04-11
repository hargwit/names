import React from 'react'

const styles = {
  outer: {
    height: '90vh',
  },
  inner: {
    height: '100%',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
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
