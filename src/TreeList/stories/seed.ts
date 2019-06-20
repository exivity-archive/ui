import faker from 'faker'

export interface FakeRecord {
  key: string
  value: string
  attributes: {
    level: number
  }
  parentId: string | null
}

const lvl1 = new Array(4).fill(null)
  .map((item, index): FakeRecord => ({
    key: String(index + 1),
    value: faker.name.firstName(),
    attributes: {
      level: 1
    },
    parentId: null
  }))

const lvl2 = new Array(12).fill(null)
  .map((item, index): FakeRecord => {
    return {
      key: String(index + 5),
      value: faker.name.firstName(),
      attributes: {
        level: 2
      },
      parentId: String(index % 4 + 1)
    }
  })

const lvl3 = new Array(24).fill(null)
  .map((item, index): FakeRecord => {
    return {
      key: String(index + 17),
      value: faker.name.firstName(),
      attributes: {
        level: 3
      },
      parentId: String(index % 12 + 5)
    }
  })

export const FLAT_LIST_TEST_DATA = lvl1.concat(lvl2).concat(lvl3)
