import { GENERATOR_ARR, DOBLE_ARR } from './arr.js';
import { STATUS } from './vk.js';

export function changeFlag() {
  STATUS.language === 'russianLetters'
    ? (STATUS.language = 'englishLetters')
    : (STATUS.language = 'russianLetters');
}

export function change() {
  GENERATOR_ARR.forEach((val, i) => {
    val.forEach((el, index) => {
      DOBLE_ARR[i][index].textContent = el[STATUS.language];
    });
  });
}
