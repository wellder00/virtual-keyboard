import {
  ALL_CODE,
  EN_LAYOUT,
  RU_LAYOUT,
  GENERATOR_ARR,
  GENERATOR_OBJ,
  GEN_KEYS_LENGTH,
  DOBLE_ARR,
  FUNCTION_SYMBOL
} from './arr.js';
import { change, changeFlag } from './changeButton.js';
import { Key } from './class.js';

// заголовок
const TITLE = document.createElement('h1');
document.body.appendChild(TITLE);
TITLE.textContent = 'RSS VIRTUAL KEYBOARD';
TITLE.classList.add('title');

// создание текстового поля
const AREA = document.createElement('textarea');
AREA.rows = 6;
AREA.cols = 50;
AREA.classList.add('area');
document.body.appendChild(AREA);
AREA.focus();

// создание блока для кнопок
const KEYBOARD_BLOCK = document.createElement('section');
KEYBOARD_BLOCK.classList.add('wrapper');
document.body.appendChild(KEYBOARD_BLOCK);

// описание
const DESCRIPTION1 = document.createElement('h2');
KEYBOARD_BLOCK.after(DESCRIPTION1);
DESCRIPTION1.textContent = 'The keyboard was created in the Windows operating system';
DESCRIPTION1.classList.add('title');
const DESCRIPTION2 = document.createElement('h2');
DESCRIPTION1.after(DESCRIPTION2);
DESCRIPTION2.textContent = 'To switch the language combination: left ctrl + alt';
DESCRIPTION2.classList.add('title');

// состояния
export const STATUS = {
  language: 'russianLetters',
  ShiftLeft: false,
  ShiftRight: false,
  ControlLeft: false,
  CapsLock: false,
  AltLeft: false,
  cursor: 0
}

// eslint-disable-next-line no-undef
if (localStorage.getItem('capsLock')) {
  STATUS.CapsLock = JSON.parse(localStorage.getItem('capsLock'))
}
window.onbeforeunload = () => {
  localStorage.setItem('capsLock', STATUS.CapsLock)
  localStorage.setItem('language', STATUS.language)
}

if (localStorage.getItem('language')) {
  STATUS.language = localStorage.getItem('language')
}

// блок состояний кнопок клавиатура
document.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftLeft') STATUS.ShiftLeft = true
  if (e.code === 'ShiftRight') STATUS.ShiftRight = true
  if (e.code === 'ControlLeft') STATUS.ControlLeft = true
  if (e.code === 'AltLeft') STATUS.AltLeft = true
  if (e.code === 'CapsLock') {
    STATUS.CapsLock === true ? STATUS.CapsLock = false : STATUS.CapsLock = true
  }
})
document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft') STATUS.ShiftLeft = false
  if (e.code === 'ShiftRight') STATUS.ShiftRight = false
  if (e.code === 'ControlLeft') STATUS.ControlLeft = false
  if (e.code === 'AltLeft') STATUS.AltLeft = false
})

// блок состояний кнопок мышь
document.addEventListener('click', (e) => {
  if (e.target.id === 'CapsLock') {
    STATUS.CapsLock === true ? STATUS.CapsLock = false : STATUS.CapsLock = true
  }
})

document.addEventListener('mousedown', (e) => {
  if (e.target.id === 'ShiftLeft') STATUS.ShiftLeft = true
  if (e.target.id === 'ShiftRight') STATUS.ShiftRight = true
  if (e.target.id === 'ControlLeft') STATUS.ControlLeft = true
  if (e.target.id === 'AltLeft') STATUS.AltLeft = true
})

document.addEventListener('mouseup', (e) => {
  if (e.target.id === 'ShiftLeft') STATUS.ShiftLeft = false
  if (e.target.id === 'ShiftRight') STATUS.ShiftRight = false
  if (e.target.id === 'ControlLeft') STATUS.ControlLeft = false
  if (e.target.id === 'AltLeft') STATUS.AltLeft = false
})

// генерация кнопок и присвоение класcов и id
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

// запись смены языка
change()

// дабавление классов при нажатии клавиш
document.addEventListener('keydown', (e) => {
  if (e.code !== 'CapsLock') {
    document.querySelector(`.${e.code.toLowerCase()}`).classList.add('active')
  }
})

document.addEventListener('keyup', (e) => {
  if (e.code !== 'CapsLock') {
    document.querySelector(`.${e.code.toLowerCase()}`).classList.remove('active')
  }
})

// Сброс стилей для таб и альт и вставка символов в пробел
window.onkeydown = (e) => {
  if (e.code === 'Tab') {
    e.preventDefault();
    AREA.value += '    ';
  } else if (e.code === 'AltLeft' || e.code === 'AltRight') {
    e.preventDefault();
  }
}

// Нажатие шифта
let shiftChange
function activeShift() {
  STATUS.language === 'russianLetters'
    ? (shiftChange = 'ruUpper')
    : (shiftChange = 'enUpper');
  GENERATOR_ARR.forEach((val, i) => {
    val.forEach((el, index) => {
      DOBLE_ARR[i][index].textContent = el[shiftChange];
    });
  });
}

function noActiveShift() {
  STATUS.language === 'russianLetters'
    ? (STATUS.language = 'russianLetters')
    : (STATUS.language = 'englishLetters');
  GENERATOR_ARR.forEach((val, i) => {
    val.forEach((el, index) => {
      DOBLE_ARR[i][index].textContent = el[STATUS.language];
    });
  });
}

// Нажатие КАПСА
let сapsChange
function activeCaps() {
  STATUS.language === 'russianLetters' && STATUS.CapsLock === true
    ? (сapsChange = 'ruUpper')
    : (сapsChange = 'enUpper');
  GENERATOR_ARR.forEach((val, i) => {
    val.forEach((el, index) => {
      DOBLE_ARR[i][index].textContent = el[сapsChange];
    });
  });
}

// верхий регистр при перезагрузке страницы
function startCaps() {
  if (STATUS.CapsLock === true) activeCaps()
  else noActiveShift()
}
startCaps()

// переключение языка и отслеживание шифта
document.addEventListener('keydown', () => {
  if (STATUS.AltLeft === true && STATUS.ControlLeft === true) changeFlag(); change()
  if (STATUS.ShiftLeft === true || STATUS.ShiftRight === true) activeShift()
  if (STATUS.CapsLock === true) activeCaps()
})

document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    if (STATUS.ShiftLeft === false || STATUS.ShiftRight === false) noActiveShift()
  }
})

// Ввод склавиатуры
document.addEventListener('keydown', (e) => {
  e.preventDefault()
  STATUS.cursor = AREA.selectionStart
  const AREA_VALUE_OLD = AREA.value
  let areaValueNew
  const keySymbol = document.querySelector(`.${e.code.toLowerCase()}`).textContent
  if (!FUNCTION_SYMBOL.includes(e.code)) {
    areaValueNew = `${AREA_VALUE_OLD.slice(0, STATUS.cursor)}${keySymbol}${AREA_VALUE_OLD.slice(STATUS.cursor)}`
    AREA.value = areaValueNew
    STATUS.cursor++
    AREA.setSelectionRange(STATUS.cursor, STATUS.cursor)
    AREA.focus()
  }
})

document.addEventListener('click', (e) => {
  STATUS.cursor = AREA.selectionStart
  const AREA_VALUE_OLD = AREA.value
  let areaValueNew;
  let keySymbol;
  if (e.target.id && e.target.classList.contains('key')) {
    keySymbol = document.querySelector(`.${e.target.id.toLowerCase()}`).textContent
    if (!FUNCTION_SYMBOL.includes(e.target.id)) {
      areaValueNew = `${AREA_VALUE_OLD.slice(0, STATUS.cursor)}${keySymbol}${AREA_VALUE_OLD.slice(STATUS.cursor)}`
      AREA.value = areaValueNew
      STATUS.cursor++
      AREA.setSelectionRange(STATUS.cursor, STATUS.cursor)
      AREA.focus()
    }
  }
})

document.addEventListener('mousedown', () => {
  if (STATUS.AltLeft === true && STATUS.ControlLeft === true) changeFlag(); change()
  if (STATUS.ShiftLeft === true || STATUS.ShiftRight === true) activeShift()
  if (STATUS.CapsLock === true) activeCaps()
})

document.addEventListener('mouseup', (e) => {
  if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
    if (STATUS.ShiftLeft === false || STATUS.ShiftRight === false) noActiveShift()
  }
})