import { palette, withProp } from 'styled-tools'
import color from 'color'

import theme from '.'

export const textColorWithProps = withProp(
  ['opaque', 'palette', 'tone'],
  (opaque, paletteProp, tone = 0) =>
    palette(opaque
      ? `${paletteProp}Text`
      : paletteProp, tone, 'inherit')
)

export const bgColorWithProps = withProp(
  ['opaque', 'palette', 'tone'],
  (opaque, paletteProp, tone = 0) => {
    if (!opaque) {
      return 'unset'
    }
    return palette(paletteProp, tone, 'unset')
  }
)

export const toCssRgbComponent = (resolver) => {
  if (typeof resolver === 'function') {
    return (props) => {
      let hex = theme.palette.primary[0]
      try {
        // @todo why the double props call?
        // console.log('props', props)
        // console.log('resolver', resolver)
        // console.log('resolver(props)', resolver(props))
        // console.log('resolver(props)(props)', resolver(props)(props))
        hex = resolver(props)(props)
      } catch (err) {
        // unset
      }
      return color(hex).rgb().array().join(', ')
    }
  } else {
    return color(resolver).rgb().array().join(', ')
  }
}
