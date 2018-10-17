import React from 'react'
import { storiesOf } from '@storybook/react'

import Field from './Field'
import Input from './../Input'
import Label from './../Label'

storiesOf('molecules|Field', module)
  .add('default', () => <Field>
    <Label htmlFor='username'>Username</Label>
    <Input id='username' outlined placeholder='Please type username' />
  </Field>)
  .add('horizontal', () => <Field horizontal>
    <Label htmlFor='username'>Username</Label>
    <Input id='username' outlined placeholder='Please type username' />
  </Field>)
  .add('align', () => <Field horizontal align>
    <Label htmlFor='username'>Username</Label>
    <Input id='username' outlined placeholder='Please type username' />
  </Field>)
  .add('multiple', () => <React.Fragment>
    <Field.Container>
      <Field>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' outlined placeholder='Please type username' />
      </Field>
      <Field>
        <Label htmlFor='email'>Email address
          <Label>We will never sell your email address and we will never spam you!</Label>
        </Label>
        <Input id='email' outlined placeholder='Please type email address' />
      </Field>
      <Field>
        <Label htmlFor='name'>Full name</Label>
        <Input id='name' outlined placeholder='Please type full name' />
      </Field>
    </Field.Container>
    <Field.Container horizontal align='40%'>
      <Field>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' outlined placeholder='Please type username' />
      </Field>
      <Field>
        <Label htmlFor='email'>Email address
          <Label>We will never sell your email address and we will never spam you!</Label>
        </Label>
        <Input id='email' outlined placeholder='Please type email address' />
      </Field>
      <Field>
        <Label htmlFor='name'>Full name</Label>
        <Input id='name' outlined placeholder='Please type full name' />
      </Field>
    </Field.Container>
  </React.Fragment>)
