const modalOverlay = document.querySelector('.modal-overlay')

const recipes = document.querySelectorAll('.recipe')

const modal = document.querySelector('.modal')

function verifyMaximize() {
    if (modal.classList.contains('maximize')){
        modal.classList.remove('maximize')
    } else {
        modal.classList.add('maximize')
    }
}

for (let recipe of recipes) {
    recipe.addEventListener('click', function () {
        const recipe_id = recipe.getAttribute('id')
        modalOverlay.classList.add('active')
        verifyMaximize()
        modalOverlay.querySelector('img').src = `../../public/asserts/${recipe_id}.png`
        modalOverlay.querySelector('img').alt = recipe_id

        modalOverlay.querySelector('.descricao-receita').innerHTML = recipe.querySelector('.recipe__content').innerHTML
        modalOverlay.querySelector('.criador-receita').innerHTML = recipe.querySelector('.recipe__info').innerHTML

    })
}


document.querySelector('.close-modal').addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    verifyMaximize()
})

