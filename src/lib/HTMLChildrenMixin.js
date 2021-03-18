export const HTMLChildrenMixin = (SuperClass) => {
  return class extends SuperClass {
    constructor() {
      super();
      this.HTMLAttributesToExtract = ['A', 'IMG', 'LI', 'VIDEO'];
    }

    extractHTMLAttributes(el) {
      this.HTMLAttr = {};
      const attrs = Array.prototype.slice.call(el.attributes);
      attrs.forEach((attr) => {
        this.HTMLAttr[attr.name] = attr.value;
      });
      if (!el.querySelectorAll('*').length) {
        this.HTMLAttr.content = el.textContent.trim();
      }
      return this.HTMLAttr;
    }

    _HTMLChildren(node = this) {
      const childNodes = [...node.querySelectorAll('*')];
      const childArr = [];
      let idCounter = 0;
      if (childNodes) {
        childNodes.forEach((el) => {
          if (el.parentNode === node) {
            const id = el.id || idCounter;
            idCounter = (el.id) ? idCounter : idCounter + 1;
            if (!el.querySelectorAll('*').length) {
              if (this.HTMLAttributesToExtract.includes(el.tagName)) {
                childArr[id] = this.extractHTMLAttributes(el);
              } else {
                childArr[id] = el.innerHTML;
              }
            } else {
              let elAttr = {};
              if (this.HTMLAttributesToExtract.includes(el.tagName)) {
                elAttr = this.extractHTMLAttributes(el);
              }
              const objChildren = this._HTMLChildren(el);
              childArr[id] = { ...elAttr, ...objChildren };
            }
          }
        });
      }
      return childArr;
    }
  }
}
