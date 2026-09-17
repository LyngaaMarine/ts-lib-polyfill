if (!Element.prototype.replaceChildren) {
  Element.prototype.replaceChildren = function (
    ...new_children: (Node | string)[]
  ) {
    this.textContent = "";
    if (new_children.length) this.append(...new_children);
  };
}
