import { GENERATOR_ARR, DOBLE_ARR } from './arr.js';

let currentStatus;

export function change() {
  const buttonA = document.querySelector('.keya');
  buttonA.textContent.toLocaleLowerCase() === 'a'
    ? (currentStatus = 'russianLetters')
    : (currentStatus = 'englishLetters');
  GENERATOR_ARR.forEach((val, i) => {
    val.forEach((el, index) => {
      DOBLE_ARR[i][index].textContent = el[currentStatus];
    });
  });
}
