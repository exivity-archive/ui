import React from 'react'
import Faker from 'faker'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Modal } from './'
import { Button } from '../Button'

storiesOf('molecules|Modal', module)
  .add('default', () => {
    return (
      <Modal
        title='Disclaimer'
        buttons={[
          <Button onClick={() => { return }}>Whatsup</Button>,
          <Button danger onClick={() => { return }}>Delete</Button>
        ]
        }> {Faker.lorem.paragraph(30)}</Modal >
    )
  })
