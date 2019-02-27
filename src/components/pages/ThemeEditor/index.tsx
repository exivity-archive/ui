import * as React from 'react'
import { AnyObject } from '../../../utils/types';

import { reassignNestedProp } from '../../../utils/reassignNestedProp'
import { updateTheme } from '../../../utils/updateTheme'

import ThemeFields from './ThemeFields'
import UpdateButton from '../../atoms/Input/Buttons/UpdateButton';


interface IThemeEditorProps {
  data: AnyObject<string>
}

const ThemeEditor: React.FC<IThemeEditorProps> = ({ data }) => {
  const [theme, setTheme] = React.useState(data)

  const onChange = (value: string, history: string[])=> {
    const themeCopy = JSON.parse(JSON.stringify(theme))
    reassignNestedProp(themeCopy, history, value)
    setTheme(themeCopy)
  }

  return <div>
    <UpdateButton onClick={() => updateTheme(theme)}></UpdateButton>
    <ThemeFields data={theme} history={[]} name='Theme' depth={1} onChange={onChange}/>
    </div>
}

export default ThemeEditor