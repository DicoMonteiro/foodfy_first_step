const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function (event) {
    const confirmation = confirm("Tem certeza que deseja excluir?")
    if (!confirmation) {
        event.preventDefault()
    }
})
