import { GENERATOR_ARR, DOBLE_ARR } from './arr.js';
import { STATUS } from './vk.js';

export function changeFlag() {
  STATUS.language === 'russianLetters'
    ? (STATUS.language = 'englishLetters')
    : (STATUS.language = 'russianLetters');
}

let сapsChange
export function change() {
  if (STATUS.CapsLock === true) {
    STATUS.language === 'russianLetters'
      ? (сapsChange = 'ruUpper')
      : (сapsChange = 'enUpper');
    document.querySelector('#CapsLock').classList.add('active')
    GENERATOR_ARR.forEach((val, i) => {
      val.forEach((el, index) => {
        DOBLE_ARR[i][index].textContent = el[сapsChange];
      });
    });
  } else {
    GENERATOR_ARR.forEach((val, i) => {
      val.forEach((el, index) => {
        DOBLE_ARR[i][index].textContent = el[STATUS.language];
      });
    });
  }
}
