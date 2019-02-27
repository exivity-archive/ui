import * as React from 'react'

import Label from '../../atoms/Input/Label';
import LeveledHeader, { HeaderLevels } from '../../atoms/Headers/LeveledHeader'
import TextInput from '../../atoms/Input/TextInput';
import { AnyObject } from '../../../utils/types';
import styled from 'styled-components';

const FieldGroup = styled.div`
  margin: 20px 0 0 40px;
`

const renderThemeFields = (data: AnyObject<string>, depth: number, history: string[], onChange: (value: string, history: string[]) => void) => (
  (key: string) => (
      <ThemeFields data={data[key]} key={key} name={key} depth={depth + 1} history={[...history, key]} onChange={onChange} />
  )
)

interface IThemeFieldsProps {
  data: string | AnyObject<string>
  name: string
  depth: number
  history: string[]
  onChange: (value: string, history: string[]) => void
}

const ThemeFields: React.FC<IThemeFieldsProps> = ({ data, name, depth, history, onChange }) => (
  <div>
    {typeof data === 'string' ? 
      <Label name={name} key={name}><TextInput value={data} onChange={(value) => onChange(value, history)}/></Label> : 
      <div>
          <div>
          <FieldGroup>
            <LeveledHeader level={(depth <= 3 ? depth : 3) as HeaderLevels}>{name}</LeveledHeader>
            {Object.keys(data).map(renderThemeFields(data, depth, history, onChange))}
          </FieldGroup>
          </div>
      </div>}
  </div>
)

export default ThemeFields
