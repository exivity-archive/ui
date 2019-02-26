import React from 'react';

import { storiesOf } from '@storybook/react';
import { BackgroundColorDecorator } from '../decorators/BackgroundColorDecorator'

import Budgets from '../components/pages/budgets'

storiesOf('Pages', module)
  .addDecorator(BackgroundColorDecorator())
  .add('Budgets', () => <Budgets/>)

