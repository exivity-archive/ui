import * as React from 'react'
import Button from './Button';
import Icon from '../../Icon'
import { MdCheck } from 'react-icons/md'

interface IUpdateButtonProps {
  onClick: () => void
}

const UpdateButton: React.FC<IUpdateButtonProps> = ({ onClick}) => {
  return <Button onClick={onClick}><Icon icon={<MdCheck/>}/> update</Button>
}

export default UpdateButton