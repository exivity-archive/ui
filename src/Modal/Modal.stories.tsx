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
          <Button onClick={() => { return }}>Whatsup</Button>,
          <Button danger onClick={() => { return }}>Delete</Button>
        ]}>{loremIpsum}</Modal>
    )
  })
