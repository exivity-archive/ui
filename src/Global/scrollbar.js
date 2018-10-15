import { css } from 'reakit'

import theme from '../theme'

const scrollbar = css`
  ::-webkit-scrollbar {
    width: ${theme.base.space};
  }
  
  ::-webkit-scrollbar-track {
      background-color: transparent;
  }
   
  ::-webkit-scrollbar-thumb {
      background: rgba(128, 128, 128, 0.4);
      border-radius: 6px;
      border: 4px solid transparent;
      background-clip: padding-box !important;
  }
  
  ::-webkit-scrollbar-thumb:hover {
      background: rgba(128, 128, 128, 0.6);
  }
`

export default scrollbar
