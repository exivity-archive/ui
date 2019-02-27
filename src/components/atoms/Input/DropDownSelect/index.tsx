import { FC, useState } from 'react'
import styled from 'styled-components';

import DropDownButton from './DropDownButton'

interface IDropDownSelectProps {
  className?: string
  value: string
  data: string[]
  onChange: (value: string) => void
}

const DropDownSelect: FC<IDropDownSelectProps> = ({ className, value, data, onChange }) => {
  const [showSelectOptions, setShowSelectOptions] = useState(false)
  const toggleShowSelectOptions = () => setShowSelectOptions(!showSelectOptions)

  return (
    <div className={className}>
      <DropDownButton value={value} onClick={toggleShowSelectOptions} />
      {/* {data.map(option => {
          <SelectOption value={option} onClick={onChange}/>
      })} */}
    </div>
  )
}

export default styled(DropDownSelect)`

`

