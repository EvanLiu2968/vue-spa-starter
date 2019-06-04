
export const paperMap = {
  'A1': {
    value: 'A1',
    name: 'A1(594x841mm)',
    width: 594,
    height: 841
  },
  'A2': {
    value: 'A3',
    name: 'A2(420x594mm)',
    width: 420,
    height: 594
  },
  'A3': {
    value: 'A3',
    name: 'A3(297x429mm)',
    width: 297,
    height: 429
  },
  'A4': {
    value: 'A4',
    name: 'A4(210x297mm)',
    width: 210,
    height: 297
  },
  'A5': {
    value: 'A5',
    name: 'A5(148x210mm)',
    width: 148,
    height: 210
  },
  'A6': {
    value: 'A6',
    name: 'A6(105x148mm)',
    width: 105,
    height: 148
  },
  'B4': {
    value: 'B4',
    name: 'B4(257x364mm)',
    width: 257,
    height: 364
  },
  'B5': {
    value: 'B5',
    name: 'B5(182x257mm)',
    width: 182,
    height: 257
  },
  'B6': {
    value: 'B6',
    name: 'B6(128x182mm)',
    width: 128,
    height: 182
  }
}
export const paperOptions = Object.keys(paperMap).map(k => paperMap[k])
