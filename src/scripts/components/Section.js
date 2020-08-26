export default class Section{
  constructor({ items, renderer }, containerSelector) {
    this._itemsForRender = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, prepend = false) {
    prepend ? this._container.prepend(element) : this._container.append(element);
  }

  renderItems() {
    this._itemsForRender.forEach(item => {
      this._renderer(item);
    });
  }
}
