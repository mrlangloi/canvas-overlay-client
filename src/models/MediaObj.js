class MediaObj {
  #id;
  name = "untitled";
  visibility = "hidden"; // visible or hidden
  src = "https://via.placeholder.com/150";
  text = "placeholder text";
  posX = `400px`;
  posY = `100px`;
  width;
  height;
  rotate = `0deg`;
  scale = 1.0; 
  orientX = 1; // 1 or -1
  orientY = 1; // 1 or -1
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