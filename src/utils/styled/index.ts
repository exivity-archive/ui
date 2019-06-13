import { useContext } from 'react'
import color from 'color'
import { css, ThemeContext } from 'styled-components'
import { defaultTheme, Theme } from '../../themes'

export type ThemeResolver<T = any> = (theme: Theme) => T

interface ThemeHelperOptions {
  defaultValue?: any
  modifier?: Function
}

export interface StyledProps {
  theme?: Theme
}

export interface PurposesProps {
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean
}

export interface SizesProps {
  tiny?: boolean
  small?: boolean
  large?: boolean
  huge?: boolean
}

export const defaultStyledProps = {
  theme: defaultTheme
}

export interface SectionProps {
  noMargin?: boolean
}

export function useStyledTheme (cb?: ThemeResolver) {
  const theme = useContext(ThemeContext)
  return (theme && cb && cb(theme)) || theme || (cb && cb(defaultTheme)) || {}
}

export type Rgb = [number, number, number]

type Color = string | Rgb

export const toRgbArray = (input: Color): Rgb => {
  try {
    return color(input).rgb().array() as Rgb
  } catch (err) {
    return [0, 0, 0]
  }
}

export function toRgbString (input: Color) {
  // If input is a var(--name) input, treat it as a 'r, g, b' value
  if (typeof input === 'string' && input.startsWith('var(--')) {
    return input
  }

  // If input is a 'r, g, b' value, treat it literally
  if (typeof input === 'string' && input.split(',').length === 3) {
    return input
  }

  return toRgbArray(input).join(', ')
}

export function toRgbCss (input: Color) {
  // Process arrays and hex values ([r, g, b] | #rrggbb) with toRgbString to get 'r, g, b' back
  return `rgb(${toRgbString(input)})`
}

const isEmptyTheme = (theme?: object) => !theme || Object.keys(theme).length === 0

export const fromTheme = <T> (themeResolver: ThemeResolver<T>) => (props: StyledProps) => {
  return themeResolver(isEmptyTheme(props.theme) ? defaultTheme as Theme : props.theme!)
}

export const matchThemeProp = (
  themeResolver: ThemeResolver,
  options: ThemeHelperOptions = {}
) => (props: any) => {
  const themeObject = themeResolver(isEmptyTheme(props.theme)
    ? defaultTheme as Theme
    : props.theme!)
  const optionallyModify = options.modifier ||
    (
      (val: any) => val
    )
  let match = Object.keys(props)
    .find((propKey: string) => {
      return props[propKey] && themeObject[propKey]
    })

  if (!match && options.defaultValue) {
    return optionallyModify(options.defaultValue)
  }

  if (!match && themeObject._default) {
    match = themeObject._default
  }

  if (!match || !themeObject[match]) {
    return null
  }

  return optionallyModify(themeObject[match])
}

export const globalSectionSpacing = css`
  margin: ${(props: SectionProps & StyledProps) => props.noMargin
  ? 0 : fromTheme(theme => theme.global.baseSpacing)(props)}rem 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const resetBox = css`
  margin: unset;
  padding: unset;
  border: unset;
  box-sizing: border-box;
`

export const globalFont = css`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: normal;
  font-size: ${fromTheme(theme => theme.global.baseSize)}px;
  color: ${fromTheme(theme => theme.global.textColor)};
  line-height: ${fromTheme(theme => theme.global.lineHeight)};
`

export const globalScrollbar = css`
  ::-webkit-scrollbar {
    width: ${fromTheme(theme => theme.global.sizes.base)}em;
  }

  ::-webkit-scrollbar-track {
      background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
      background: rgba(128, 128, 128, 0.4);
      border-radius: 6px;
      border: 4px solid transparent;
      background-clip: padding-box !important;
  }

  ::-webkit-scrollbar-thumb:hover {
      background: rgba(128, 128, 128, 0.6);
  }
`
