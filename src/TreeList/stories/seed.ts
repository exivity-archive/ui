import faker from 'faker'

export interface FakeRecord {
  key: string
  value: string
  attributes: {
    level: number
  }
  parentId: string | null
}

const lvl1 = new Array(1).fill(null)
  .map((item, index): FakeRecord => ({
    key: '1',
    value: faker.name.firstName(),
    attributes: {
      level: 1
    },
    parentId: null
  }))

const lvl2 = new Array(4).fill(null)
  .map((item, index): FakeRecord => {
    return {
      key: String(index + 2),
      value: faker.name.firstName(),
      attributes: {
        level: 2
      },
      parentId: '1'
    }
  })

const lvl3 = new Array(16).fill(null)
  .map((item, index): FakeRecord => {
    return {
      key: String(index + 6),
      value: faker.name.firstName(),
      attributes: {
        level: 3
      },
      parentId: String(index % 4 + 2)
    }
  })

export const FLAT_LIST_TEST_DATA = lvl1.concat(lvl2).concat(lvl3)
