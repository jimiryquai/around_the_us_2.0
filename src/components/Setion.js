export class Section {
  constructor({ items, renderer }, containerSelector) {
    // parameter destructuring
    this._items = items;
    this._renderer = renderer;
    this.containerSelector = containerSelector;
  }

  renderer() {}

  addItem() {}
}
