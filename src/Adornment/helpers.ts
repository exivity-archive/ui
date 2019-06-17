import { RefObject } from 'react'

function makeExpression (expression: string, curr: string | number | undefined | null) {
  if (!curr || curr === '0px') return expression

  const element = typeof curr === 'number'
    ? curr + 'px'
    : curr

  if (expression.length === 0) return element
  return expression + ' + ' + element
}

export function makeCssCalcExpression (...args: (string | number | undefined | null)[]) {
  const statement = args.reduce(makeExpression, '')

  if (statement.length === 0) return undefined
  if (statement.length === 1) return statement
  return `calc(${statement})`
}

export function tryGetRectProp (ref: RefObject<HTMLElement>, rectPropKey: keyof (DOMRect | ClientRect)) {
  if (ref.current) {
    return ref.current.getBoundingClientRect()[rectPropKey]
  }
}
