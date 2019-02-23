import * as React from 'react'
import { AnyObject } from '../../../utils/types';

import Label from '../../atoms/Input/Label';
import LeveledHeader, { HeaderLevels } from '../../atoms/Headers/LeveledHeader'
import TextInput from '../../atoms/Input/TextInput';
import { reassignNestedProp } from '../../../utils/reassignNestedProp'

const renderThemeField = (data: AnyObject<string>, depth: number, history: string[], onChange: (value: string, history: string[]) => void) => (
  (key: string) => (
      <ThemeField data={data[key]} name={key} depth={depth + 1} history={[...history, key]} onChange={onChange} />
  )
)

interface IThemeFieldProps {
  data: string | AnyObject<string>
  name: string
  depth: number
  history: string[]
  onChange: (value: string, history: string[]) => void
}

const ThemeField: React.FC<IThemeFieldProps> = ({ data, name, depth, history, onChange }) => (
  <div>
    {typeof data === 'string' ? 
      <Label name={name} key={name}><TextInput value={data} onChange={(value) => onChange(value, history)}/></Label> : 
      <div>
        <LeveledHeader level={(depth <= 6 ? depth : 6) as HeaderLevels}>{name}</LeveledHeader>
        {Object.keys(data).map(renderThemeField(data, depth, history, onChange))}
      </div>}
  </div>
)

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

  return <div><ThemeField data={theme} history={[]} name='Theme' depth={1} onChange={onChange}/></div>
}

export default ThemeEditor