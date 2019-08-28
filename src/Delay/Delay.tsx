import React, { useState, FC, ReactNode } from 'react'

import { useTimeout } from '../useTimeout'

interface DelayProps {
  wait: number
  children: ReactNode
}

export const Delay: FC<DelayProps> = ({ wait, children }) => {
  const [show, setShow] = useState(false)

  useTimeout(() => setShow(true), wait)

  return <div>{show ? children : null}</div>
}
