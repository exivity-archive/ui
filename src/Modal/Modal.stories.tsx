import React from 'react'
import { storiesOf } from '@storybook/react'
import { Modal } from './'
import { loremIpsum } from '../utils/loremIpsum'
import { Button } from '../Button/Button'

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
