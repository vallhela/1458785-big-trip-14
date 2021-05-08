export default class Observable {
  constructor() {
    if (new.target === Observable) {
      throw new Error('Can\'t instantiate Observable, only concrete one.');
    }

    this._observers = [];
  }

  addObserver(value) {
    this._observers.push(value);
  }

  removeObserver(value) {
    this._observers = this._observers.filter((observer) => observer !== value);
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}
