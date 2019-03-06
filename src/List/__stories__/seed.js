import Faker from 'faker'

const GROUPS = [
  'group one',
  'group two',
  'group three',
  'group four',
  'group five'
]

const selectGroup = () => {
  return Math.floor(Math.random() * GROUPS.length + 1) - 1
}

export const FLAT_LIST_TEST_DATA = new Array(20).fill(null)
  .map((item, index) => {
    const group = GROUPS[selectGroup()]
    console.log(group)
    return {
      key: String(index + 1),
      value: Faker.name.firstName(),
      grouping: group,
      attributes: {
        group,
      },
    }
  })

