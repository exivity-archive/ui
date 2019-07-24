import React, { useState, useCallback, FC, ReactNode } from 'react'

import { useTimeout } from '../useTimeout'

interface DelayProps {
  wait: number
  children: ReactNode
}

export const Delay: FC<DelayProps> = ({ wait, children }) => {
  const [show, setShow] = useState(false)

  const showChildren = useCallback(() => {
    setShow(true)
  }, [])

  useTimeout(showChildren, wait)

  return <div>{show ? children : null}</div>
}
