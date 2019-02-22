import React from 'react'
import { shallowWithTheme } from '../../../utils/testing/shallowWithTheme'
import { MdAccountBalanceWallet } from 'react-icons/md'

import Icon from './'

test('renders icon', () => {
  const button = shallowWithTheme(<Icon icon={<MdAccountBalanceWallet/>} onClick={() => { return }} />)
  expect(button).toMatchSnapshot()
})

test('renders icon with subicon', () => {
  const button = shallowWithTheme(<Icon icon={<MdAccountBalanceWallet/>} subIcon={<MdAccountBalanceWallet/>} onClick={() => { return }} />)
  expect(button).toMatchSnapshot()
})
