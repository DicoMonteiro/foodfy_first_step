const express = require('express')
const routes = express.Router()

const recipes = require('./controllers/recipes')

// const recipes_old = require('./data')

const data = require("./data.json")


routes.get("/", function(req, res) {
    return res.render("home", { items: data.recipes })
})

routes.get("/about", function(req, res) {
    return res.render("about")
})

routes.get("/recipes", function(req, res) {
    return res.render("recipes", { items: data.recipes })
})

routes.get("/recipe/:index", function(req, res) {
    const receitas = data.recipes
    
    const recipeIndex =  req.params.index

    // console.log(recipeIndex)
    // console.log(receitas[recipeIndex])

    const recipe = data.recipes.find(function(recipe) {
        // console.log(recipe[recipeIndex])
        return recipe == receitas[recipeIndex]
    })

    if (!recipe){
        return res.send("Recipe not found!")
    }

    return res.render("recipe", { item: recipe })
})

// routes.get("/", function(req, res) {
//     return res.redirect("/admin/recipes")
// })

// Novas rotas (Create, Update, Delete and Show)
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)


module.exports = routes