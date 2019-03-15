import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Checkbox } from '../Checkbox'
import { Field } from '.'
import { TextInput } from '../TextInput'
import { Label } from '../Label'
import { mockFn } from '../utils/stories/mocks'

storiesOf('forms|Field', module)
  .add('default', () => <Field>
    <Label htmlFor='username'>Username</Label>
    <TextInput id='username' placeholder='Please type username' onChange={mockFn}/>
  </Field>)
  .add('horizontal', () => <Field horizontal>
    <Label htmlFor='username'>Username</Label>
    <TextInput id='username' placeholder='Please type username' onChange={mockFn}/>
  </Field>)
  .add('align', () => <Field horizontal align>
    <Label htmlFor='username'>Username</Label>
    <TextInput id='username' placeholder='Please type username' onChange={mockFn}/>
  </Field>)
  .add('multiple', () => <React.Fragment>
    <Field.Container>
      <Field>
        <Label htmlFor='username'>Username</Label>
        <TextInput id='username' placeholder='Please type username' onChange={mockFn}/>
      </Field>
      <Field>
        <Label htmlFor='email'>Email address
          <Label>We will never sell your email address and we will never spam you!</Label>
        </Label>
        <TextInput id='email' placeholder='Please type email address' onChange={mockFn}/>
      </Field>
      <Field>
        <Label htmlFor='name'>Receive newsletter</Label>
        <TextInput id='name' placeholder='Please type full name' onChange={mockFn}/>
      </Field>
    </Field.Container>
    <Field.Container horizontal align='40%'>
      <Field>
        <Label htmlFor='username2'>Username</Label>
        <TextInput id='username2' placeholder='Please type username' onChange={mockFn}/>
      </Field>
      <Field>
        <Label htmlFor='email2'>Email address
          <Label>We will never sell your email address and we will never spam you, that's a promise you can rely on. All other promises you need to catch.</Label>
        </Label>
        <TextInput id='email2' placeholder='Please type email address' onChange={mockFn}/>
      </Field>
      <Field>
        <Label/>
        <Checkbox checked/>
      </Field>
    </Field.Container>
  </React.Fragment>)
