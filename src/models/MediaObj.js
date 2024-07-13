class MediaObj {

  constructor(id) {
    this.id = `media-${id}`;
    this.name = "";
    this.text = "placeholder text";
    this.src = "https://via.placeholder.com/150";
    this.posX = `400px`;
    this.posY = `100px`;
    this.rotate = `0deg`;
    this.scale = 1.0;
    this.opacity = 1.0;
    this.zIndex = 1;
  }
}

export default MediaObj;