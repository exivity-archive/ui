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

const lvl2 = new Array(8).fill(null)
  .map((item, index): FakeRecord => {
    if (index > 3) {
      return {
        key: String(index + 101),
        value: faker.name.firstName(),
        attributes: {
          level: 2
        },
        parentId: String(index - 3)
      }
    } else {
      return {
        key: String(index + 101),
        value: faker.name.firstName(),
        attributes: {
          level: 2
        },
        parentId: String(index + 1)
      }
    }
  })

// const lvl3 = new Array(400).fill(null)
//   .map((item, index): FakeRecord => {
//     if (index > 199) {
//       return {
//         key: String(index + 301),
//         value: faker.name.firstName(),
//         attributes: {
//           level: 3
//         },
//         parentId: String(index - 100)
//       }
//     } else {
//       return {
//         key: String(index + 301),
//         value: faker.name.firstName(),
//         attributes: {
//           level: 3
//         },
//         parentId: String(index + 101)
//       }
//     }
//   })

export const FLAT_LIST_TEST_DATA = lvl1.concat(lvl2)
// .concat(lvl3)
