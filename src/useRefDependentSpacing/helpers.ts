function makeExpression (expression: string, curr: string | number | undefined | null) {
  if (!curr || curr === '0px') return expression

  const element = typeof curr === 'number'
    ? curr + 'px'
    : curr

  if (expression.length === 0) return element
  return expression + ' + ' + element
}

export function makeSpacingExpression (...args: (string | number | undefined | null)[]) {
  const statement = args.reduce(makeExpression, '')

  if (statement.length === 0) return '0'
  if (statement.includes('+')) return `calc(${statement})`
  return statement
}
