import React from 'react'
import { MdInfo } from 'react-icons/md'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { Icon } from '../Icon'
import { Tooltip } from './Tooltip'

describe('The Tooltip component', () => {

  const TriggerIcon = React.forwardRef<any, any>((props, ref) => (
    <Icon ref={ref}><MdInfo /></Icon>
  ))

  test('by default shows the trigger element, but not tooltip itself', () => {
    const wrapper = mount((
      <Tooltip TriggerComponent={TriggerIcon}>
        <div>Additional info is here</div>
      </Tooltip>
    ))

    const trigger = wrapper.find(Tooltip.TriggerWrapper)
    const content = wrapper.find(Tooltip.Content)
    expect(trigger).toHaveLength(1)
    expect(content).toHaveLength(0)
  })

  test('if defaultOpen is passed, shows the trigger element and tooltip itself', () => {
    const wrapper = mount((
      <Tooltip defaultOpen={true} TriggerComponent={TriggerIcon}>
        <div>Additional info is here</div>
      </Tooltip>
    ))

    const trigger = wrapper.find(Tooltip.TriggerWrapper)
    const content = wrapper.find(Tooltip.Content)
    expect(trigger).toHaveLength(1)
    expect(content).toHaveLength(1)
  })

  test('ignores defaultOpen, if open is passed', () => {
    let wrapper = mount((
      <Tooltip
        defaultOpen={true}
        open={false}
        TriggerComponent={TriggerIcon}
      >
        <div>Additional info is here</div>
      </Tooltip>
    ))

    let trigger = wrapper.find(Tooltip.TriggerWrapper)
    let content = wrapper.find(Tooltip.Content)
    expect(trigger).toHaveLength(1)
    expect(content).toHaveLength(0)

    wrapper.unmount()

    wrapper = mount((
      <Tooltip
        defaultOpen={false}
        open={true}
        TriggerComponent={TriggerIcon}
      >
        <div>Additional info is here</div>
      </Tooltip>
    ))

    trigger = wrapper.find(Tooltip.TriggerWrapper)
    content = wrapper.find(Tooltip.Content)
    expect(trigger).toHaveLength(1)
    expect(content).toHaveLength(1)
  })

  test('by default toggles tooltip on mouse enter/leave the trigger', () => {
    const wrapper = mount((
      <Tooltip TriggerComponent={TriggerIcon}>
        <div>Additional info is here</div>
      </Tooltip>
    ))

    const trigger = wrapper.find(Tooltip.TriggerWrapper)
    let content = wrapper.find(Tooltip.Content)
    expect(trigger).toHaveLength(1)
    expect(content).toHaveLength(0)

    trigger.simulate('mouseenter')
    content = wrapper.find(Tooltip.Content)
    expect(content).toHaveLength(1)

    act(() => { trigger.simulate('mouseleave') })
    content = wrapper.find(Tooltip.Content)
    expect(content.hostNodes()).toHaveLength(0)
  })

  test('if open is passed, ignores mouse enter/leave events', () => {
    const wrapper = mount((
      <Tooltip open={false} TriggerComponent={TriggerIcon}>
        <div>Additional info is here</div>
      </Tooltip>
    ))

    const trigger = wrapper.find(Tooltip.TriggerWrapper)
    let content = wrapper.find(Tooltip.Content)
    expect(trigger).toHaveLength(1)
    expect(content).toHaveLength(0)

    trigger.simulate('mouseenter')
    content = wrapper.find(Tooltip.Content)
    expect(content).toHaveLength(0)
  })
})
