class MediaObj {
  id;
  name = "New Card";
  visibility = "hidden"; // visible or hidden
  src = "https://via.placeholder.com/128";
  text = "";
  fontFamily = "Varela Round";
  color = "#ffffff";
  fontSize = "16";
  posX = "400";
  posY = "100";
  width = "-1"; // -1 == auto
  height = "-1"; // -1 == auto
  rotation = "0"; // -180 to 180
  orientX = "1"; // 1 or -1
  orientY = "1"; // 1 or -1
  opacity = "1";
  zIndex = "10";



  constructor(id) {
    this.id = id;
    this.name += `(${id})`;
  }

}

export default MediaObj;