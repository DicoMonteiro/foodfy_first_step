
const recipes = document.querySelectorAll('.recipe')

// Solução usando o 'i' para incremento: 
for (let i = 0; i < recipes.length; i++) {
    recipes[i].addEventListener('click', () => {
        window.location.href = `/recipe/${ i }`;
    });
}


// Funções de exibir ou esconder as informações da receita
function showHide(id) {
    var display = document.getElementById(id).style.display;
    var element = ''
    if (id == "ingredients"){
        element = document.getElementById("ingredients-button");
    }
    else if (id == "preparation") {
        element = document.getElementById("preparation-button");
    }
    else {
        element = document.getElementById("information-button");
    }
    
    
    if(display == "none") {
        document.getElementById(id).style.display = 'block';
        element.innerHTML="ESCONDER";
        // console.log('mostrou...')
    } else {
        document.getElementById(id).style.display = 'none';
        // console.log('escondeu...')
        element.innerHTML="MOSTRAR";
    }

}

//  Backup para analise e estudo posteriormente
// Solução usando o id, gerado no HTML pelo indexOf:
// for (let recipe of recipes) {
//     recipe.addEventListener('click', () => {
//         const recipe_id = recipe.getAttribute('id')
//         // console.log(recipe_id)
//         window.location.href = `/recipe/${recipe_id}`;
//     }
// }

// for (let recipe of recipes.length) {
//     recipe.addEventListener('click', function () {
//         const recipe_index = recipes.indexOf(recipe)
//         console.log(recipe_index)
//         window.location.href = `/recipe/${recipe_index}`
        
//         // const recipe_id = recipe.getAttribute('id')
//         // modalOverlay.querySelector('img').src = `/asserts/${recipe_id}.png`
//         // modalOverlay.querySelector('img').alt = recipe_id

//         // modalOverlay.querySelector('.descricao-receita').innerHTML = recipe.querySelector('.recipe__content').innerHTML
//         // modalOverlay.querySelector('.criador-receita').innerHTML = recipe.querySelector('.recipe__info').innerHTML

//     })
// }
