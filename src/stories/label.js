import React from 'react'
import Label from '../components/atoms/Label'

import { storiesOf } from '@storybook/react'
import {CenterDecorator} from "../decorators/CenterDecorator";

export default storiesOf('Label', module)
  .addDecorator(CenterDecorator)
  .add('Label', () => {
    return <Label name='Label name' description='Label description'/>
  })