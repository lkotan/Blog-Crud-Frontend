import Vue from 'vue'
Vue.mixin({
  created() {
    Object.defineProperty(Object.prototype, "clearPhone", {
      value: function clearPhone() {
        return this
          .replace(/\(/g, '')
          .replace(/\)/g, '')
          .replace(/\-/g, '')
          .replace(/\ /g, '');
      },
      writable: true,
      configurable: true
    });
    Object.defineProperty(Array.prototype, "select", {
      value: function select(key) {
        let result = [];
        this.forEach(element => {
          result.push(element[key]);
        });
        return result;
      },
      writable: true,
      configurable: true
    });
  }
})
