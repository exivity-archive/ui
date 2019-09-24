import 'jest-styled-components'
import 'jest-specific-snapshot'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

/**
 * @see https://github.com/mui-org/material-ui/blob/master/test/utils/createDOM.js
 */
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
})

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

// Set faker seed
faker.seed(1)
