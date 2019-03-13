import 'jest-styled-components'
import faker from 'faker'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

// Set faker seed
faker.seed(1)
