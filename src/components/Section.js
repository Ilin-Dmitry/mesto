export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAllElements () {
    this._items.forEach((item) => {
      this.addItem(item);
    })
  }

  addItem (item) {
    // this._container.prepend(element);
    const card = this._renderer(item)
    this._container.prepend(card);  }
}
