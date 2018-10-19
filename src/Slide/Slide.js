import React from 'react'
import PropTypes from 'prop-types'
import { Hidden } from 'reakit'
import AnimateHeight from 'react-animate-height'

const timeToInt = (duration) => {
  return parseInt(
    duration
      .replace('ms', '')
      .replace('s', '000')
    , 10)
}

const AnimatedHeightSlide = ({
  'aria-hidden': ariaHidden,
  children,
  visible,
  hideOnClickOutside,
  fade,
  expand,
  slide,
  duration,
  delay,
  timing,
  animated,
  ...otherProps
}) => {
  const durationInteger = animated ? timeToInt(duration) : 0
  const delayInteger = delay && timeToInt(delay)

  return <Hidden {...otherProps} visible hideOnClickOutside={hideOnClickOutside && visible}>
    <AnimateHeight
      style={{
        'WebkitMarginCollapse': 'separate'
      }}
      height={visible ? 'auto' : 0}
      easing={timing}
      duration={durationInteger}
      delay={delayInteger}>
      {children || <span />}
    </AnimateHeight>
  </Hidden>
}

const Slide = Hidden.as(AnimatedHeightSlide)

const { unmound, fade, expand, slide, ...otherHiddenPropTypes } = Hidden.propTypes

Slide.propTypes = {
  ...otherHiddenPropTypes,

  children: PropTypes.node
}

Slide.defaultProps = {
  ...Hidden.defaultProps,

  animated: true
}

Slide.displayName = 'Slide'

export default Slide
