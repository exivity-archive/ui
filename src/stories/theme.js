import React from 'react';

import { storiesOf } from '@storybook/react';

import ThemeEditor from '../components/pages/ThemeEditor';
import theme from '../theme';

storiesOf('Theme', module).add('theme', () => <ThemeEditor data={theme} />);

