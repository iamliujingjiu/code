class ClassWithGetSet {
    #msg = 'hello world';
    get msg() {
      return this.#msg;
    }
    set msg(x) {
      this.#msg = `hello ${x}`;
    }
  }

  module.exports = ClassWithGetSet;