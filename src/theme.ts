const theme = {
  global: {
    margin: '20px !default'
  },
  colors: {
    gray: '#aaa'
  }
}

type Required<T> = { [P in keyof T]-?: T[P] };
export type Theme = Required<typeof theme>

export default theme as Theme
