import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Modal } from './'
import { loremIpsum } from '../utils/loremIpsum'
import { Button } from '../Button'

storiesOf('molecules|Modal', module)
  .add('default', () => {
    return (
      <Modal
        title='Disclaimer'
        buttons={[
          <Button onClick={() => { return }} key={1}>Whatsup</Button>,
          <Button danger onClick={() => { return }} key={2}>Delete</Button>
        ]
        }> {loremIpsum}</Modal >
    )
  })
