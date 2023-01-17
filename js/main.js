const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const attrToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = [];
  for(const key of keys) {
    attrs.push(`${key}="${obj[key]}"`) 
  }
  return attrs.join("");
}

const tagAttr = (obj) => (content = "") => `<${obj.tag} ${obj.attrs? "" : ""}${attrToString(obj.attrs)}>${content}<${obj.tag}>`;

const tag = t => {
  if (typeof t === "string") {
    tagAttr({tag: t});
  } else {
    tagAttr(t);
  }
}

let description = $('#description');
let calories = $('#calories');
let carbs = $('#carbs');
let protein = $('#protein');

description.keypress(() => (description.removeClass("is-invalid")));
calories.keypress(() => (calories.removeClass("is-invalid")));
carbs.keypress(() => (carbs.removeClass("is-invalid")));
protein.keypress(() => (protein.removeClass("is-invalid")));

const validateInputs = () => {
  description.val() ? "" : description.addClass("is-invalid");
  calories.val() ? "" : calories.addClass("is-invalid");
  carbs.val() ? "" : carbs.addClass("is-invalid");
  protein.val() ? "" : protein.addClass("is-invalid");
}

const cleanInputs = () => {
  description.val("");
  calories.val("");
  carbs.val("");
  protein.val("")
}