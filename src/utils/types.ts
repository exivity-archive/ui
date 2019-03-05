export type primitive = string | number | boolean | undefined | null

export type DeepReadonly <T> = T extends primitive ? T : DeepReadonlyObject<T>

export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export interface AnyObject<T> {
  [key: string]: T | AnyObject<T>
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
