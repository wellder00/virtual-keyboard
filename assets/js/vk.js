import {
  ALL_CODE,
  EN_LAYOUT,
  RU_LAYOUT,
  GENERATOR_ARR,
  GENERATOR_OBJ,
  GEN_KEYS_LENGTH,
} from './arr.js';

const AREA = document.createElement('textarea');
AREA.rows = 6;
AREA.cols = 50;
AREA.classList.add('area');
document.body.appendChild(AREA);
AREA.focus();

const KEYBOARD_BLOCK = document.createElement('section');
KEYBOARD_BLOCK.classList.add('wrapper');
document.body.appendChild(KEYBOARD_BLOCK);

class Key {
  constructor(englishLetters, russianLetters, keyCode) {
    // eslint-disable-next-line no-underscore-dangle
    this._className = `el-${englishLetters}`;
    this.englishLetters = englishLetters;
    this.enUpper = /[a-z]/.test(this.englishLetters) ? this.englishLetters.toUpperCase() : this.englishLetters;
    this.russianLetters = russianLetters;
    this.ruUpper = /[а-яё]/.test(this.russianLetters) ? this.russianLetters.toUpperCase() : this.russianLetters;
    this.keyCode = keyCode;
  }
}

const STATUS = {
  ShiftLeft: false,
  ShiftRight: false,
  ControlLeft: false,
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftLeft') STATUS.ShiftLeft = true
  if (e.code === 'ShiftRight') STATUS.ShiftRight = true
  if (e.code === 'ControlLeft') STATUS.ControlLeft = true
  // console.log(STATUS);
})

document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft') STATUS.ShiftLeft = false
  if (e.code === 'ShiftRight') STATUS.ShiftRight = false
  if (e.code === 'ControlLeft') STATUS.ControlLeft = false
})

const DOBLE_ARR = Array.from({ length: 5 }, () => []);

for (let i = 0; i < EN_LAYOUT.length; i++) {
  const keys = EN_LAYOUT[i].map((englishLetters, j) => {
    const russianLetters = RU_LAYOUT[i][j];
    const keyCode = ALL_CODE[i][j];
    const key = new Key(englishLetters, russianLetters, keyCode);
    GENERATOR_OBJ[keyCode] = key;
    return key;
  });
  GENERATOR_ARR[i] = keys;
  KEYBOARD_BLOCK.appendChild(GEN_KEYS_LENGTH[i]);
  keys.forEach((key) => {
    const button = document.createElement('button');
    button.classList.add((key.keyCode).toLowerCase(), 'key');
    button.id = key.keyCode;
    button.textContent = key.russianLetters;
    GEN_KEYS_LENGTH[i].appendChild(button);
    DOBLE_ARR[i].push(button);
  });
}

GENERATOR_ARR
let currentStatus
function change() {
  const buttonA = document.querySelector('.keya')
  buttonA.textContent.toLocaleLowerCase() === 'a' ? currentStatus = 'russianLetters' : currentStatus = 'englishLetters'
  GENERATOR_ARR.forEach((val, i) => {
    val.forEach((el, index) => {
      DOBLE_ARR[i][index].textContent = el[currentStatus]
    })
  })
}

document.addEventListener('keydown', () => {
  if (STATUS.ShiftLeft === true && STATUS.ControlLeft === true) change()
})
