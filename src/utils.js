// Create Element
export const createElement = (type, options = {}) => {
  const element = document.createElement(type);
  //loop over options
  Object.entries(options).forEach(([key, value]) => {
    //build DataSet
    if (key.startsWith("data")) {
      Object.entries(value).forEach(([key, value]) => {
        element.dataset[key] = value;
      });
      return;
    }
    //add classNames
    if (key === "classList") {
      value.forEach((el) => {
        element.classList.add(el);
      });
      return;
    }
    //set remaining attributes
    element.setAttribute(key, value);
  });

  return element;
};
