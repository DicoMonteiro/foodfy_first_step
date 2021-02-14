
const recipes = document.querySelectorAll('.recipe')

// Solução usando o 'i' para incremento do index: 
// for (let i = 0; i < recipes.length; i++) {
//     recipes[i].addEventListener('click', () => {
//         window.location.href = `/recipe/${ i }`;
//     });
// }


for (let recipe of recipes) {
    recipe.addEventListener('click', () => {
        // const recipe_id = recipe.getAttribute('id')
        // console.log(recipe_id)
        window.location.href = `/recipe/${recipe.getAttribute('id')}`;
    })
}


//  Backup para analise e estudo posteriormente
// Solução usando o id, gerado no HTML pelo indexOf:
// for (let recipe of recipes) {
//     recipe.addEventListener('click', () => {
//         const recipe_id = recipe.getAttribute('id')
//         // console.log(recipe_id)
//         window.location.href = `/recipe/${recipe_id}`;
//     })
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


function paginate(selectedPage, totalPages) {
    let pages = [],
    oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPages = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        
        if (firstAndLastPages || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPage
        }
    }
    return pages
}

function createPagination(pagination) {
    // Usando o '+' para converter para numérico
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const filter = pagination.dataset.filter
    const pages = paginate(page, total)

    // console.log(pages)

    // Inserindo a paginação no HTML
    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            // elements += `<a href="?page=${page}">${page}</a>`
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    // Exibir a quantidade de páginas:
    // pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}