import { css } from 'reakit'
import { ifProp, palette as p, prop, theme as t } from 'styled-tools'

import { utils } from '../theme'

// Stuck in a loop while importing this function from utils
export const preciseRm = (fraction, size = type.size) => {
  const rounded = Math.round(size * fraction)

  return rounded / size
}

export const base = {
  space: '1em',
  spaceHalf: '0.5em',
  spaceDouble: '2em',
  borderRadius: '4px'
}

export const type = {
  size: 16,
  lineHeight: 1.5,
  fonts: {
    url: 'https://fonts.googleapis.com/css?family=Fira+Mono|Fira+Sans+Condensed:500|Fira+Sans:400,600',
    base: {
      family: '\'Fira Sans\', sans-serif',
      weight: 400,
      weightBold: 600
    },
    interact: {
      family: '\'Fira Sans Condensed\', sans-serif',
      weight: 500
    },
    monospace: {
      family: '\'Fira Mono\', monospace',
      weight: 400
    }
  }
}

export const size = {
  xsmall: 0.6,
  small: 0.8,
  large: 1.2,
  xlarge: 1.4
}

export const palette = {
  white: '#ffffff',
  whiteText: p('black'),

  black: '#212121',
  blackText: p('white'),

  // https://coolors.co/2196f3-42a5f5-64b5f6-90caf9-bbdefb
  primary: ['#2196f3', '#42a5f5', '#64b5f6', '#90caf9', '#bbdefb'],
  primaryText: [p('white'), p('white'), p('black'), p('black'), p('black')],

  // https://coolors.co/8e8e8e-acacac-b7b7b7-cbcbcb-e0e0e0
  secondary: ['#8E8E8E', '#acacac', '#b7b7b7', '#cbcbcb', '#e0e0e0'],
  secondaryText: [p('white'), p('white'), p('black'), p('black'), p('black')],

  // https://coolors.co/f44336-ef5350-e57373-ef9a9a-ffcdd2
  danger: ['#f44336', '#ef5350', '#e57373', '#ef9a9a', '#ffcdd2'],
  dangerText: [p('white'), p('white'), p('black'), p('black'), p('black')],

  // https://coolors.co/ffc107-ffca28-ffd54f-ffe082-ffecb3
  warning: ['#ffc107', '#ffca28', '#ffd54f', '#ffe082', '#ffecb3'],
  warningText: [p('black'), p('black'), p('black'), p('black'), p('black')],

  // https://coolors.co/4caf50-66bb6a-81c784-a5d6a7-c8e6c9
  success: ['#4caf50', '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9'],
  successText: [p('white'), p('white'), p('white'), p('black'), p('black')],

  grayscale: [
    p('black'),
    '#414141',
    '#616161',
    '#9e9e9e',
    '#bdbdbd',
    '#e0e0e0',
    '#f5f5f5',
    p('white')
  ],
  grayscaleText: [
    p('white'),
    p('white'),
    p('white'),
    p('black'),
    p('black'),
    p('black'),
    p('black'),
    p('black')
  ],

  background: [
    p('grayscale', -4),
    p('grayscale', -3),
    p('grayscale', -2),
    p('grayscale', -1)
  ],
  backgroundText: p('black'),

  shadow: [
    'rgba(0, 0, 0, 0.9)',
    'rgba(0, 0, 0, 0.7)',
    'rgba(0, 0, 0, 0.5)',
    'rgba(0, 0, 0, 0.3)',
    'rgba(0, 0, 0, 0.15)',
    'rgba(0, 0, 0, 0.075)'
  ],
  shadowText: [
    p('white'),
    p('white'),
    p('white'),
    p('black'),
    p('black'),
    p('black')
  ],

  transparent: 'transparent',
  transparentText: p('black'),

  border: p('shadow', -2),

  marker: '#fdf6e3'
}

export const Avatar = css`
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  overflow: hidden;
  object-fit: cover;
`

export const Blockquote = css`
  border-left: 5px solid ${p('grayscale', -3)};
  padding: 0.5em 0 0.5em 1em;
  font-style: italic;
`

export const Box = css`
  --focus-color: ${utils.toCssRgbComponent(utils.bgColorWithProps)
}};
`

export const Button = css`
  font-family: ${t('type.fonts.interact.family')};
  font-weight: ${t('type.fonts.interact.weight')};
  text-transform: uppercase;
  display: inline-flex;
  position: relative;
  appearance: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 2.5em;
  height: 2.5em;
  padding: 0 ${preciseRm(1.2)}em;
  border-radius: ${t('base.borderRadius')};
  flex: none;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  outline: none;
  &:hover {
    box-shadow: inset 0 0 999em ${p('shadow', -2)};
  }
  &:focus {
    box-shadow: inset 0 0 999em ${p('shadow', -2)},
      0 0 0 4px rgba(var(--focus-color), 0.3);
  }
  &:active,
  &.active {
    box-shadow: inset 0 0 999em ${p('shadow', -3)},
      0 0 0 4px rgba(var(--focus-color), 0.3);
  }
  &:after {
    display: none;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, 0.35);
  }
  &[disabled] {
    pointer-events: none;
    &:after {
      display: block;
    }
  }
`

export const Code = css`
  font-family: ${t('type.fonts.monospace.family')};
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: ${ifProp('block', '0', '0.25em 0.35em')};
  background-color: ${p('marker')};
  border-radius: 0.25em;

  code {
    display: block;
    padding: 1em;
  }
`

export const Field = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  label {
    padding-bottom: 0.5em;
  }
  > *:not(label):not(:last-child) {
    margin-bottom: 0.5em;
  }
`

export const GroupItem = css`
  border: 1px solid ${p('border')};
  border-radius: 0.25em;
`

export const Heading = css`
  font-weight: ${t('type.fonts.base.weight')};
  margin: 1em 0 0.5em;
  &:first-child {
    margin-top: 0;
  }
  h1& {
    font-size: 2.5em;
  }
  h2& {
    font-size: 2em;
  }
  h3& {
    font-size: 1.75em;
  }
  h4& {
    font-size: 1.5em;
  }
  h5& {
    font-size: 1.25em;
  }
  h6& {
    font-size: 1em;
  }
`

export const Image = css`
  display: block;
  max-width: 100%;
`

export const Input = css`
  display: block;
  width: 100%;
  padding: 0 0.5em;
  height: 2.5em;
  border-radius: 0.25em;

  &[type="checkbox"],
  &[type="radio"] {
    display: inline-block;
    width: auto;
    height: auto;
    padding: 0;
  }

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  textarea & {
    padding: 0.5em;
    height: auto;
  }
`

export const Link = css`
  display: inline-grid;
  grid-gap: 0.25em;
  align-items: center;
  grid-auto-flow: column;
  text-decoration: none;
  
  --focus-color: ${utils.toCssRgbComponent(utils.textColorWithProps)};
  
  &:focus {
    outline: none;
    border-radius: 1px;
    background-color: rgba(var(--focus-color), 0.3);
    box-shadow: 0 0 0 4px rgba(var(--focus-color), 0.3);
  }

  &:hover {
    text-decoration: underline;
  }
`

export const List = css`
  list-style: none;

  li {
    margin-bottom: 0.35em;
  }
`

export const Overlay = css`
  padding: 1em;
  border-radius: 0.25em;
  box-shadow: 0 0 0 1px ${p('shadow', -2)}, 0 4px 8px ${p('shadow', -2)},
    0 16px 48px ${p('shadow', -2)};
`

export const Paragraph = css`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

export const Popover = css`
  padding: 1em;
  border-radius: 0.25em;
  box-shadow: 0 0 0 1px ${p('shadow', -2)}, 0 2px 4px ${p('shadow', -1)},
    0 8px 24px ${p('shadow', -1)};

  &[aria-hidden="false"] {
    transition-timing-function: ${prop(
    'timing',
    'cubic-bezier(0.25, 0.1, 0.25, 1.5)'
  )};
  }
`

export const PopoverArrow = css`
  & .stroke {
    fill: ${p('shadow', -2)};
  }
`

export const Sidebar = css`
  border-radius: 0;
`

export const Table = css`
  border: 1px solid ${p('grayscale', 4)};
  table-layout: fixed;
  border-collapse: collapse;
  background-color: ${p('background', -1)};
  line-height: 200%;

  tbody,
  td,
  th,
  tfoot,
  thead,
  tr {
    border: inherit;
  }

  caption {
    text-transform: uppercase;
    font-size: 0.9em;
    color: ${p('grayscale', 3)};
  }

  td,
  th {
    padding: 0 8px;
    vertical-align: middle;
  }

  th {
    font-weight: bold;
    background-color: ${p('shadow', -1)};
  }
`

export const Tabs = css`
  display: flex;
  align-items: center;
  list-style: none;
`

export const TabsTab = css`
  display: inline-flex;
  position: relative;
  flex: 1;
  user-select: none;
  outline: none;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  text-decoration: none;
  height: 2.5em;
  padding: 0 0.5em;
  min-width: 2.5em;
  &.active {
    font-weight: bold;
  }
  &[disabled] {
    pointer-events: none;
  }
`

export const Tooltip = css`
  text-transform: none;
  pointer-events: none;
  white-space: nowrap;
  font-size: 0.875em;
  text-align: center;
  box-shadow: none;
  border-radius: 0.25em;
  padding: 0.75em 1em;
`

export const TooltipArrow = css`
  & .stroke {
    fill: none;
  }
`

export default {
  base,
  type,
  size,
  palette,
  Avatar,
  Blockquote,
  Box,
  Button,
  Code,
  Field,
  GroupItem,
  Heading,
  Image,
  Input,
  Link,
  List,
  Overlay,
  Paragraph,
  Popover,
  PopoverArrow,
  Sidebar,
  Table,
  Tabs,
  TabsTab,
  Tooltip,
  TooltipArrow
}
