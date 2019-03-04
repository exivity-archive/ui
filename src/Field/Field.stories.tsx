import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import Field from './Field'
import TextInput from './../TextInput'
import Label from './../Label'

storiesOf('forms|Field', module)
  .add('default', () => <Field>
    <Label htmlFor='username'>Username</Label>
    <TextInput id='username' placeholder='Please type username' />
  </Field>)
  .add('horizontal', () => <Field horizontal>
    <Label htmlFor='username'>Username</Label>
    <TextInput id='username' placeholder='Please type username' />
  </Field>)
  .add('align', () => <Field horizontal align>
    <Label htmlFor='username'>Username</Label>
    <TextInput id='username' placeholder='Please type username' />
  </Field>)
  .add('multiple', () => <React.Fragment>
    <Field.Container>
      <Field>
        <Label htmlFor='username'>Username</Label>
        <TextInput id='username' placeholder='Please type username' />
      </Field>
      <Field>
        <Label htmlFor='email'>Email address
          <Label>We will never sell your email address and we will never spam you!</Label>
        </Label>
        <TextInput id='email' placeholder='Please type email address' />
      </Field>
      <Field>
        <Label htmlFor='name'>Full name</Label>
        <TextInput id='name' placeholder='Please type full name' />
      </Field>
    </Field.Container>
    <Field.Container horizontal align='40%'>
      <Field>
        <Label htmlFor='username2'>Username</Label>
        <TextInput id='username2' placeholder='Please type username' />
      </Field>
      <Field>
        <Label htmlFor='email2'>Email address
          <Label>We will never sell your email address and we will never spam you, that's a promise you can rely on. All other promises you need to catch.</Label>
        </Label>
        <TextInput id='email2' placeholder='Please type email address' />
      </Field>
      <Field>
        <Label htmlFor='name2'>Full name</Label>
        <TextInput id='name2' placeholder='Please type full name' />
      </Field>
    </Field.Container>
  </React.Fragment>)
