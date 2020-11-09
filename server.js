const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

// const recipes = require('./data')
// Configuração para acessar o req.body
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/views", {
    express:server,
    autoescape: false,
    noCache: true
})

// server.get("/", function(req, res) {
//     return res.render("home", { items: recipes })
// })

// server.get("/about", function(req, res) {
//     return res.render("about")
// })


// server.get("/recipes", function(req, res) {
//     return res.render("recipes", { items: recipes })
// })

// server.get("/recipe/:index", function(req, res) {
//     const receitas = recipes
    
//     const recipeIndex =  req.params.index

//     // console.log(recipeIndex)
//     // console.log(receitas[recipeIndex])

//     const recipe = recipes.find(function(recipe) {
//         // console.log(recipe[recipeIndex])
//         return recipe == receitas[recipeIndex]
//     })

//     if (!recipe){
//         return res.send("Recipe not found!")
//     }

//     return res.render("recipe", { item: recipe })
// })

server.use(function(req, res) {
    res.status(404).render("not-found");
})

server.listen(5000, function() {
    console.log("server is running...")
})