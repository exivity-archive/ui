import { ExtraPadding, Position } from './Adornment'

function makeExpression (expression: string, curr: string | number) {
  if (curr === 0 || curr === '0px') return expression

  const element = typeof curr === 'number'
    ? curr + 'px'
    : curr

  if (expression.length === 0) return element
  return expression + ' + ' + element
}

export function makeCssCalcExpression (...args: (string | number)[]) {
  const statement = args.reduce(makeExpression, '')

  return `calc(${statement})`
}

function mapProp<T extends {}> (args: T[], prop: keyof T) {
  return args.map(item => item[prop])
}

export function mergeExtraPadding (...args: ExtraPadding[]): ExtraPadding {
  return {
    [Position.LEFT]: makeCssCalcExpression(...mapProp(args, Position.LEFT)),
    [Position.RIGHT]: makeCssCalcExpression(...mapProp(args, Position.RIGHT))
  }
}
