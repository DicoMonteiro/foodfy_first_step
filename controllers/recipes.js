const fs = require("fs")
const data = require("../data.json")

const itens = {
    subtitle: ["Receita:", "Ingredientes", "Modo de preparo", "Informações adicionais"],
    editBtn: "Editar receita"
}

exports.index = function(req, res) {
    return res.render("admin/recipes/index", { recipes: data.recipes })
}

exports.create = function(req, res) {
    return res.render("admin/recipes/create")
}

exports.show = function(req, res) {

    // Solução pegando pelo index, porém quando é para Editar ou Excluir não consegui ajustar de pegar pelo index.
    const recipes = data.recipes
    const recipeIndex = req.params.id
    const recipe = data.recipes.find(function(recipe){
        return recipe == recipes[recipeIndex]
    })

    // Solução pegando pelo ID
    // const { id } = req.params

    // const foundRecipe = data.recipes.find(function(recipe){
    //     return recipe.id == id
    // })

    // if (!foundRecipe) return res.send("Member not found!")

    // const recipe = {
    //     // Spread Operator (espalhando o ojeto)
    //     ...foundRecipe
    // }

    return res.render("admin/recipes/show", { recipe, itens })
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Please, fill all fields!!")
    }

    // Desestruturando o req.body
    // const { title, author, image, preparation, information, ingredients } = req.body

    let id = 1
    const lastRecipe = data.recipes[data.recipes.length - 1]

    if (lastRecipe) {
        id = lastRecipe.id + 1
    }
    
    data.recipes.push({
        id,
        ...req.body,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write File error!")

        return res.redirect("/admin/recipes")
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe) {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/recipes/edit', { recipe })
}

exports.put = function(req, res) {
    const { id } = req.body

    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
        if (id == recipe.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipe,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe) {
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}