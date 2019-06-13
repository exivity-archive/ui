import { PaddingForChild, Position } from './Adornment'

export function mergePaddingForChild (...paddingForChilds: PaddingForChild[]): PaddingForChild {
  return {
    [Position.LEFT]: makeCssCalcString(...paddingForChilds.filter(paddingForChild => paddingForChild).map(paddingForChild => paddingForChild[Position.LEFT])),
    [Position.RIGHT]: makeCssCalcString(...paddingForChilds.filter(paddingForChild => paddingForChild).map(paddingForChild => paddingForChild[Position.RIGHT]))
  }
}

export function makeCssCalcString (...args: (string | undefined)[]) {
  return `calc(${args.reduce((acc, curr) =>
    curr
      ? acc + ' + ' + curr
      : acc
  )})`
}
