export function updateCardState(element, property, value) {
  if (property === "orientX" || property === "orientY") {
    if (value) {
      element[property] = "-1";
    }
    else {
      element[property] = "1";
    }
  }
  else if (property === "opacity") {
    element[property] = `${parseFloat(value / 100)}`;
  }
  else {
    element[property] = value;
  }
  
  return element;
}