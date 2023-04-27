export class Key {
  constructor(englishLetters, russianLetters, keyCode) {
    this._className = `el-${englishLetters}`;
    this.englishLetters = englishLetters;
    this.enUpper = /[a-z]/.test(this.englishLetters) ? this.englishLetters.toUpperCase() : this.englishLetters;
    this.russianLetters = russianLetters;
    this.ruUpper = /[а-яё]/.test(this.russianLetters) ? this.russianLetters.toUpperCase() : this.russianLetters;
    this.keyCode = keyCode;
  }
}