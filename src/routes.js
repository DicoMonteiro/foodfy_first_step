const express = require('express')
const routes = express.Router()

const recipes = require('./app/controllers/recipes')

const chefs = require('./app/controllers/chefs')

// const recipes_old = require('./data')

const data = require("../data")


routes.get("/", function(req, res) {
    return res.render("home", { items: data.recipes })
})

routes.get("/about", function(req, res) {
    return res.render("about")
})

// routes.get("/recipes", function(req, res) {
//     // return res.render("recipes", { items: data.recipes })
//     return res.render("recipes", { items: recipes.indexSite })
// })

routes.get("/recipes", recipes.indexSite)

routes.get("/chefs", chefs.indexSite)

routes.get("/filter_recipes", recipes.indexSite)

// routes.get("/recipe/:index", function(req, res) {
//     const receitas = data.recipes
    
//     const recipeIndex =  req.params.index

//     // console.log(recipeIndex)
//     // console.log(receitas[recipeIndex])

//     const recipe = data.recipes.find(function(recipe) {
//         // console.log(recipe[recipeIndex])
//         return recipe == receitas[recipeIndex]
//     })

//     if (!recipe){
//         return res.send("Recipe not found!")
//     }

//     return res.render("recipe", { item: recipe })
// })

routes.get("/recipe/:id", recipes.showSite)

routes.get("/admin/home", recipes.index)

// Novas rotas de receita (Create, Update, Delete and Show)
// routes.get("/admin/home", recipes.home)
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

// Novas rotas de chef (Create, Update, Delete and Show)
routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)


module.exports = routes