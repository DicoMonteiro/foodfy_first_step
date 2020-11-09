function addItems(item, field) {
    // Realiza um clone do último item adicionado
    const newField = field[field.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    // adicionando um novo input para a estrutura do Ingrediente ou Preparo
    item.appendChild(newField);
}

const ingredients = document.querySelector("#ingredients");
const fieldIngredient = document.querySelectorAll(".ingredient");

const preparations = document.querySelector("#preparation");
const fieldPreparation = document.querySelectorAll(".preparation");

  
document.querySelector(".add-ingredient").addEventListener("click", function(){addItems(ingredients, fieldIngredient)})
document.querySelector(".add-preparation").addEventListener("click", function(){addItems(preparations, fieldPreparation)})
