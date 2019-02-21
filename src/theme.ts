const theme = {
  global: {
    margin: '20px !default',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !default;'
  },
  colors: {
    gray: '#aaa'
  }
}

type Required<T> = { [P in keyof T]-?: T[P] };
export type Theme = Required<typeof theme>

export default theme as Theme
