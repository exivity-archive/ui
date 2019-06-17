import { RefObject } from 'react'

export function tryGetRectProp (ref: RefObject<HTMLElement>, rectPropKey: keyof (DOMRect | ClientRect)) {
  if (ref.current) {
    return ref.current.getBoundingClientRect()[rectPropKey]
  }
}
