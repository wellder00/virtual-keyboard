export class Key {
  constructor(englishLetters, russianLetters, keyCode) {
    this._className = `el-${englishLetters}`;
    this.englishLetters = englishLetters;
    this.enUpper = /^[a-z]$/i.test(this.englishLetters) ? this.englishLetters.toUpperCase() : this.englishLetters;
    this.russianLetters = russianLetters;
    this.ruUpper = /^[\u0410-\u044F\u0401]$/i.test(this.russianLetters) ? this.russianLetters.toUpperCase() : this.russianLetters;
    this.keyCode = keyCode;
  }
}