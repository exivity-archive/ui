import { DeepReadonly } from './utils/types'

const theme = {
    global: {
        margin: '20px !default',
        fontFamily: 'Fira Mono Latin Regular'
    },
    colors: {
        gray: '#aaa',
        black: '#000',
        darker: '#222',
        dark: '#2e2e2e',
        kindadarkish: '#444',
        darkish: '#777',
        grayish: '#ccc',
        silver: '#e2e2e2',
        silverish: '#eee',
        light: '#f4f4f4',
        white: '#fff',
        darkblue: '#438dc7',
        blue: '#00a8d8',
        lightblue: '#5cccea',
        lighterblue: '#ccf4ff',
        lightestblue: '#e6f9ff',
        red: '#c33c32',
        yellow: '#fff68c',
        green: '#238e47'
    }
}

export type Theme = DeepReadonly<typeof theme>

export default theme
