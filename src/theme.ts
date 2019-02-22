const theme = {
  global: {
    margin: '20px !default',
    fontFamily: 'Fira Mono Latin Regular'
  },
  colors: {
    gray: '#aaa'
  }
}

type Readonly<T> = { readonly [P in keyof T]-?: T[P] };
export type Theme = Readonly<typeof theme>

export default theme as Theme
