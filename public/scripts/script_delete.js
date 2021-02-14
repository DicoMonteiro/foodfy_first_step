const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function (event) {
    const total_recipes = document.querySelector('.total-recipes')
    const confirmation = confirm("Tem certeza que deseja excluir?")
    if (!confirmation) {
        event.preventDefault()
    }

    // Verificando e validando se o chef possui ou não receita vinculadas para excluir
    if (total_recipes) {
        const total = +total_recipes.dataset.total;
        if (total) {
            event.preventDefault();
            alert("Chefs que possuem receitas não podem ser deletados!!")
        }
    }
})
