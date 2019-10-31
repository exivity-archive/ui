import React from 'react'
import { storiesOf } from '@storybook/react'

import { Checkbox } from '../Checkbox'

import { Field, Input, Label, Select, SelectList } from '..'

storiesOf('interact|Field', module)
  .add('default', () => (
    <Field>
      <Label htmlFor='username'>Username</Label>
      <Input id='username' placeholder='Please type username' />
    </Field>
  ))
  .add('horizontal', () => (
    <Field horizontal>
      <Label htmlFor='username'>Username</Label>
      <Input id='username' placeholder='Please type username' />
    </Field>
  ))
  .add('align', () => (
    <Field horizontal align>
      <Label htmlFor='username'>Username</Label>
      <Input id='username' placeholder='Please type username' />
    </Field>
  ))
  .add('multiple', () => (
    <>
      <Field.Container>
        <Field>
          <Label htmlFor='username'>Username</Label>
          <Input id='username' placeholder='Please type username' />
        </Field>
        <Field>
          <Label htmlFor='email'>Email address
            <Label>We will never sell your email address and we will never spam you!</Label>
          </Label>
          <Input id='email' placeholder='Please type email address' />
        </Field>
        <Field>
          <Label htmlFor='name'>Receive newsletter</Label>
          <Input id='name' placeholder='Please type full name' />
        </Field>
      </Field.Container>
      <Field.Container horizontal align='30em'>
        <Field>
          <Label htmlFor='username2'>Username</Label>
          <Input id='username2' placeholder='Please type username' />
        </Field>
        <Field>
          <Label htmlFor='email2'>Email address
            <Label>
              We will never sell your email address and we will never spam you, that's a
              promise you can rely on. All other promises you need to catch.
            </Label>
          </Label>
          <Input id='email2' placeholder='Please type email address' />
        </Field>
        <Field>
          <Label>Select a value</Label>
          <Select placeholder='Select with SelectList'>
            <SelectList data={[]} />
          </Select>
        </Field>
        <Field>
          <Label>Privacy consent</Label>
          <Checkbox label='I want cookies' checked />
        </Field>
      </Field.Container>
    </>
  ))
