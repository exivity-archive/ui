import Faker from 'faker'

const lvl1 = new Array(100).fill(null)
  .map((item, index) => ({
    key: index + 1,
    value: Faker.name.firstName(),
    attributes: {
      level: 1,
    },
    parent: null,
    children: []
  }))

const lvl2 = new Array(200).fill(null)
  .map((item, index) => {
    if (index > 99) {
      return {
        key: index + 101,
        value: Faker.name.firstName(),
        attributes: {
          level: 2,
        },
        parent: index - 99,
        children: []
      }
    } else {
      return {
        key: index + 101,
        value: Faker.name.firstName(),
        attributes: {
          level: 2,
        },
        parent: index + 1,
        children: []
      }
    }
  })

const lvl3  = new Array(400).fill(null)
  .map((item, index) => {
    if (index > 199) {
      return {
        key: index + 301,
        value: Faker.name.firstName(),
        attributes: {
          level: 3,
        },
        parent: index - 100,
        children: []
      }
    } else {
      return {
        key: index + 301,
        value: Faker.name.firstName(),
        attributes: {
          level: 3,
        },
        parent: index + 101,
        children: []
      }
    }
  })

export const FLAT_LIST_TEST_DATA = lvl1.concat(lvl2).concat(lvl3)
