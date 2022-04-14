export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAllElements (items) {
    items.reverse().forEach((item) => {
      this.addItem(item);
    })
  }

  addItem (item) {
    const card = this._renderer(item)
    this._container.prepend(card);  }
}
