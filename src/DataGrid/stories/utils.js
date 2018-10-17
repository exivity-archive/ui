/**
 * Generate a unique random 8 character id (not cryptographically secure).
 *
 * @returns {string}
 */
const randomIdMemory = []
export const randomId = () => {
  let id

  if (process.env.NODE_ENV !== 'test') {
    do {
      id = Math.random().toString(36).substring(2, 10)
    } while (randomIdMemory.indexOf(id) > -1)
  } else {
    id = randomIdMemory.length
  }

  randomIdMemory.push(id)

  return id
}

/* eslint-disable-next-line max-len */
const RANDOM_WORDS = ['abstrusity', 'advertisable', 'bellwood', 'benzole', 'boreum', 'brenda', 'cassiopeian', 'chansonnier', 'cleric', 'conclusional', 'conventicle', 'copalm', 'cornopion', 'crossbar', 'disputative', 'djilas', 'ebracteate', 'ephemerally', 'epidemical', 'evasive', 'eyeglasses', 'farragut', 'fenny', 'ferryman', 'fluently', 'foreigner', 'genseng', 'glaiket', 'haunch', 'histogeny', 'illocution', 'imprescriptible', 'inapproachable', 'incisory', 'intrusiveness', 'isoceraunic', 'japygid', 'juiciest', 'jump', 'kananga', 'leavening', 'legerdemain', 'licence', 'licia', 'luanda', 'malaga', 'mathewson', 'nonhumus', 'nonsailor', 'nummary', 'nyregyhza', 'onanist', 'opis', 'orphrey', 'paganising', 'pebbling', 'penchi', 'photopia', 'pinocle', 'principally', 'prosector.', 'radiosensitive', 'redbrick', 'reexposure', 'revived', 'subexternal', 'sukarnapura', 'supersphenoid', 'tabularizing', 'territorialism', 'tester', 'thalassography', 'tuberculise', 'uncranked', 'undersawyer', 'unimpartible', 'unsubdivided', 'untwining', 'unwaived', 'webfoot', 'wedeling', 'wellingborough', 'whiffet', 'whipstall', 'wot', 'yonkersite', 'zonary']

function createRandomizedItems (depth, flat = true, parent) {
  let items = []
  let randomName
  let randomNumber
  let numChildren
  let randomValue

  if (process.env.NODE_ENV !== 'test') {
    randomName = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)]
    randomNumber = Math.floor(Math.random() * 100)
    numChildren = (depth < 3 && flat === false) ? Math.floor(Math.random() * 5) : 0
    randomValue = parseInt(Math.random() * 10, 10)
  } else {
    randomName = 'Test name'
    randomNumber = 50
    numChildren = (depth < 3 && flat === false) ? 3 : 0
    randomValue = 5
  }

  const random = randomId()

  const item = {
    id: random,
    parent: parent || null,
    name: randomName,
    number: randomNumber,
    group: 'Group ' + randomName.substr(0, 1),
    value: randomValue
  }

  items.push(item)

  for (let i = 0; i < numChildren; i++) {
    items = items.concat(createRandomizedItems(depth + 1, flat, item.key))
  }

  return items
}

export function createRandomizedData (items = 100, flat = true) {
  let data = []

  for (let i = 0; i < items; i++) {
    data = data.concat(createRandomizedItems(0, flat))
  }

  return data
}
