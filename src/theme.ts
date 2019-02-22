const theme = {
    primaryFont: 'Fira Mono Latin Regular',
        global: {
        margin: '20px !default'
    }
}

type Required<T> = { readonly [P in keyof T]-?: T[P] };
export type Theme = Required<typeof theme>

export default theme as Theme
