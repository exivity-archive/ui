import { useState, useEffect } from 'react'

type returnValue = {
  isOpen: boolean,
  open: () => void,
  close: () => void,
  toggle: () => void
}

export function useClosable (
  defaultOpen: boolean,
  open: boolean | null,
  onToggle: (open: boolean) => void
): returnValue {
  const [initialSkipped, setInitialSkipped] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(open === null ? defaultOpen : open)

  const setIsOpenWithCallback = (o: boolean) => {
    if (open === null) {
      setIsOpen(o)
    } else {
      onToggle(o)
    }
  }

  useEffect(() => {
    if (!initialSkipped) {
      setInitialSkipped(true)
    } else if (open === null) {
      onToggle(isOpen)
    }
  }, [isOpen])

  useEffect(() => { if (open !== null) setIsOpen(open) }, [open])

  return {
    isOpen,
    open: () => setIsOpenWithCallback(true),
    close: () => setIsOpenWithCallback(false),
    toggle: () => setIsOpenWithCallback(!isOpen)
  }
}
