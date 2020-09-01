import React from 'react'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export const CenteredColumn = ({ children }) => (
  <div style={style}>{children}</div>
)
