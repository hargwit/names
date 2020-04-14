import React from 'react'

const styles = {
  outer: {
    height: '95vh',
    minHeight: '520px',
  },
  inner: {
    height: '100%',
    maxWidth: '400px',
    maxHeight: '800px',
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
