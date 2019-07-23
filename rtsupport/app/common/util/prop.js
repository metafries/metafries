import React from 'react'

export const componentDecorator = (href, text, key) => (
  <a 
    style={{wordBreak: 'break-all'}} 
    href={href} 
    key={key} 
    target="_blank"
    rel='noopener noreferrer'
    >
    {text}
  </a>
)
