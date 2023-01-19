const list = [];

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

const tagAttr = (obj) => (content = "") => `<${obj.tag} ${obj.attrs? "" : ""}${attrToString(obj.attrs)}>${content}</${obj.tag}>`;

const tag = t => {
  if (typeof t === "string") {
    return tagAttr({tag: t});
  } else {
    return tagAttr(t);
  }
}


const tableCell = tag("td");
const tableCells = items => items.map(tableCell).join("");

const tableRowTag = tag("tr");
const tableRows = items => compose(tableRowTag, tableCells)(items);

let description = $('#description');
let calories = $('#calories');
let carbs = $('#carbs');
let protein = $('#protein');

description.keypress(() => (description.removeClass("is-invalid")));
calories.keypress(() => (calories.removeClass("is-invalid")));
carbs.keypress(() => (carbs.removeClass("is-invalid")));
protein.keypress(() => (protein.removeClass("is-invalid")));

const renderItems = () => {
  $("tbody").empty();

  list.map(item => {
    console.log(tableRows([item.description, item.calories, item.carbs, item.protein]));
    $("tbody").append(tableRows([item.description, item.calories, item.carbs, item.protein]));
  });
};

const updateTotal = () => {
  let calories = 0, carbs = 0, protein = 0;
  list.map(item => {
    calories += item.calories;
    carbs += item.carbs;
    protein += item.protein;
  });
  $("#totalCalories").text(calories);
  $("#totalCarbs").text(carbs);
  $("#totalProtein").text(protein);
}

const add = () => {
  const newItem = {
    description: description.val(),
    calories: Number(calories.val()),
    carbs: Number(carbs.val()),
    protein: Number(protein.val())
  }

  list.push(newItem);
  cleanInputs();
  renderItems();
  updateTotal();
};

const validateInputs = () => {
  description.val() ? "" : description.addClass("is-invalid");
  calories.val() ? "" : calories.addClass("is-invalid");
  carbs.val() ? "" : carbs.addClass("is-invalid");
  protein.val() ? "" : protein.addClass("is-invalid");

  if (description.val() && calories.val() && carbs.val() && protein.val()) {
    add()
  }
}

const cleanInputs = () => {
  description.val("");
  calories.val("");
  carbs.val("");
  protein.val("")
}