import { ExtraPadding, Position } from './Adornment'

export function makeCssCalcStatement (...args: string[]) {
  return `calc(${args.reduce((acc, curr) => acc + ' + ' + curr)})`
}

function mapProp<T extends {}> (args: T[], prop: keyof T) {
  return args.map(item => item[prop])
}

export function mergeExtraPadding (...args: ExtraPadding[]): ExtraPadding {
  return {
    [Position.LEFT]: makeCssCalcStatement(...mapProp(args, Position.LEFT)),
    [Position.RIGHT]: makeCssCalcStatement(...mapProp(args, Position.RIGHT))
  }
}
