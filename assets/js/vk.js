import {
  ALL_CODE,
  EN_LAYOUT,
  RU_LAYOUT,
  GENERATOR_ARR,
  GENERATOR_OBJ,
  GEN_KEYS_LENGTH,
  DOBLE_ARR,
} from './arr.js';
import { change } from './changeButton.js';
import { Key } from './class.js';

const TITLE = document.createElement('h1');
document.body.appendChild(TITLE);
TITLE.textContent = 'RSS Виртуальная клавиатура';
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

// состояния
const STATUS = {
  ShiftLeft: false,
  ShiftRight: false,
  ControlLeft: false,
  CapsLock: false
}

// блок событий кнопок
document.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftLeft') STATUS.ShiftLeft = true
  if (e.code === 'ShiftRight') STATUS.ShiftRight = true
  if (e.code === 'ControlLeft') STATUS.ControlLeft = true
  if (e.code === 'CapsLock') {
    STATUS.CapsLock === true ? STATUS.CapsLock = false : STATUS.CapsLock = true
  }
})

document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft') STATUS.ShiftLeft = false
  if (e.code === 'ShiftRight') STATUS.ShiftRight = false
  if (e.code === 'ControlLeft') STATUS.ControlLeft = false
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

// переключение языка
// срабатывает при активном КАПСЕ
document.addEventListener('keydown', () => {
  if (STATUS.ShiftLeft === true && STATUS.ControlLeft === true) change()
})

// дабавляю класс при нажатии
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

// стили для КАПСА, не работает нажатие
const CAPS = document.getElementById('CapsLock');

CAPS.addEventListener('click', () => {
  CAPS.classList.toggle('active');
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'CapsLock') {
    CAPS.classList.toggle('active');
  }
});

// Сброс стилей для таб и альт и вставка символов в пробел
window.onkeydown = (e) => {
  if (e.code === 'Tab') {
    e.preventDefault();
    AREA.value += '    ';
  } else if (e.code === 'AltLeft' || e.code === 'AltRight') {
    e.preventDefault();
  }
}