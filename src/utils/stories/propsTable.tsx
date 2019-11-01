import * as React from 'react'

import * as UI from '../..'
import { Alert } from '../../Alert'
import { Code } from '../../Code'
import { Heading } from '../../Heading'
import { Markdown } from '../../Markdown'
import { Section } from '../../Section'
import { Table } from '../../Table'
import { ObjectOf } from '../types'

import { commonProps } from './commonProps'
import { styledSystemProps } from './styledSystemProps'

import { omit } from '..'

interface PropDefinition {
  defaultValue: any
  description: string
  name: string
  required: boolean
  type: {
    name: string
  }
}

const propGroups: any = {
  common: commonProps,
  'styled-system': styledSystemProps
}

export const PropsTable = ({ component, include }: { component: string; include: string[] }) => {
  let props: ObjectOf<PropDefinition>
  try {
    const [main, sub] = component.split('.')
    props = sub
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      ? UI[main][sub].__docgenInfo.props
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      : UI[main].__docgenInfo.props
  } catch (err) {
    return <Alert danger> Could not load props for {component}</Alert>
  }

  let propsToOmit = [
    ...commonProps,
    ...styledSystemProps
  ]

  // Remove all entries passed in with include from propsToOmit.
  include.forEach(include => {
    if (propGroups[include]) {
      propsToOmit = propsToOmit.filter(item => !propGroups[include].includes(item))
    } else {
      propsToOmit = propsToOmit.filter(item => include !== item)
    }
  })

  props = omit(props, propsToOmit)

  return (
    <>
      <Heading type='sub'>{component}</Heading>
      <Table>
        <colgroup>
          <col width='20%' />
          <col />
        </colgroup>
        <tbody>
          {Object.keys(props).map(key => (
            <tr key={key}>
              <td>
                <strong>{props[key].name}</strong>
              </td>
              <td>
                <Section><Code>{props[key].type.name}</Code></Section>
                {props[key].defaultValue && <Section>{props[key].defaultValue}</Section>}
                <Markdown>{props[key].description}</Markdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
