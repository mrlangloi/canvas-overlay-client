class MediaObj {
  #id;
  name = "untitled";
  text = "placeholder text";
  src = "https://via.placeholder.com/150";
  posX = `400px`;
  posY = `100px`;
  rotate = `0deg`;
  scale = 1.0;
  opacity = 1.0;
  zIndex = 1;


  constructor(id) {
    this.id = id;
    this.name += "(" + id + ")";
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }
}

export default MediaObj;