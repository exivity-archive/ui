import Faker from 'faker'

const lvl1 = new Array(100).fill(null)
  .map((item, index) => ({
    key: String(index + 1),
    value: Faker.name.firstName(),
    attributes: {
      level: 1,
    },
    parentId: null
  }))

const lvl2 = new Array(200).fill(null)
  .map((item, index) => {
    if (index > 99) {
      return {
        key: String(index + 101),
        value: Faker.name.firstName(),
        attributes: {
          level: 2,
        },
        parentId: index - 99
      }
    } else {
      return {
        key: String(index + 101),
        value: Faker.name.firstName(),
        attributes: {
          level: 2,
        },
        parentId: index + 1
      }
    }
  })

const lvl3  = new Array(400).fill(null)
  .map((item, index) => {
    if (index > 199) {
      return {
        key: String(index + 301),
        value: Faker.name.firstName(),
        attributes: {
          level: 3,
        },
        parentId: index - 100
      }
    } else {
      return {
        key: String(index + 301),
        value: Faker.name.firstName(),
        attributes: {
          level: 3,
        },
        parentId: index + 101
      }
    }
  })

export const FLAT_LIST_TEST_DATA = lvl1.concat(lvl2).concat(lvl3)
