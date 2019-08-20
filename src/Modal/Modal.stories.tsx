import React from 'react'
import Faker from 'faker'

import { storiesOf } from '@storybook/react'
import { Modal } from './'
import { Button } from '../Button'
import { Heading } from '../Heading'

storiesOf('molecules|Modal', module)
  .add('default', () => {
    return (
      <Modal
        title={<Heading>Disclaimer</Heading>}
        buttons={[
          <Button onClick={() => { return }}>Whatsup</Button>,
          <Button danger onClick={() => { return }}>Delete</Button>
        ]
        }> {Faker.lorem.paragraph(30)}</Modal >
    )
  })
