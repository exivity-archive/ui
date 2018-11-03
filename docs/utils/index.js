import React from 'react'
import { Box } from 'reakit'

export const maxWidth = story => <Box maxWidth='50rem'>
  {story()}
</Box>
