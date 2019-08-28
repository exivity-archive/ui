import React from 'react'
import Faker from 'faker'
import { MdClose, MdCheck } from 'react-icons/md'
import { storiesOf } from '@storybook/react'

import { Modal, Button, Paragraph, Icon } from '..'
import { Heading } from '../Heading'

storiesOf('molecules|Modal', module)
  .add('default', () => {
    return (
      <Modal
        title='Disclaimer'
        buttons={[
          <Button success>
            <Icon>
              <MdCheck />
            </Icon>{' '}
            Acknowledge
          </Button>,
          <Button secondary>
            <Icon>
              <MdClose />
            </Icon>{' '}
            Close
          </Button>
        ]}
      >
        <Paragraph>{Faker.lorem.paragraph(8)}</Paragraph>
      </Modal>
    )
  })
  .add('custom title', () => {
    return (
      <Modal title={<Heading type='section'>Custom title component</Heading>}>
        <Paragraph>{Faker.lorem.paragraph(8)}</Paragraph>
      </Modal>
    )
  })
