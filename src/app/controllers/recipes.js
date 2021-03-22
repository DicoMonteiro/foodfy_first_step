// const fs = require("fs")
// const data = require("../../../data")

const { age, date } = require("../../lib/utils")
const Recipe = require("../../models/Recipe")

const itens = {
    subtitle: ["Receita:", "Ingredientes", "Modo de preparo", "Informações adicionais"],
    editBtn: "Editar receita"
}


module.exports = {
    index(req,res) {
        let { filter, page, limit } = req.query

        // Essa estrutura a seguir substitui o if/else, controlando a quantidade de registro por pagina:
        page = page || 1
        limit = limit || 8
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {
                if (!recipes) return res.send("Recipe not found!")
                
                let pagination = ""
                
                if (recipes.length == 0) {
                    pagination = {
                        total: 1,
                        page
                    }
                } else {
                    pagination =  {
                        total: Math.ceil(recipes[0].total / limit),
                        page
                    }
                }
                // Recipe.findChef(req.params.id, function(chef) {
                //     console.log(chef)
                //     return res.render("admin/recipes/index", { recipes, pagination, filter, chef})
                // })

                return res.render("admin/recipes/index", { recipes, pagination, filter})
            }
        }

        Recipe.paginate(params)
    },
    indexSite(req,res) {
        let { filter, page, limit } = req.query

        // Essa estrutura a seguir substitui o if/else, controlando a quantidade de registro por pagina:
        page = page || 1
        limit = limit || 8
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {
                if (!recipes) return res.send("Recipe not found!")
                
                let pagination = ""
                
                if (recipes.length == 0) {
                    pagination = {
                        total: 1,
                        page
                    }
                } else {
                    pagination =  {
                        total: Math.ceil(recipes[0].total / limit),
                        page
                    }
                }
                // Recipe.findChef(req.params.id, function(chef) {
                //     console.log(chef)
                //     return res.render("admin/recipes/index", { recipes, pagination, filter, chef})
                // })

                return res.render("recipes", { recipes, pagination, filter})
            }
        }

        Recipe.paginate(params)
    },
    indexFilter(req,res) {
        let { filter, page, limit } = req.query

        // Essa estrutura a seguir substitui o if/else, controlando a quantidade de registro por pagina:
        page = page || 1
        limit = limit || 8
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {
                if (!recipes) return res.send("Recipe not found!")
                
                let pagination = ""
                
                if (recipes.length == 0) {
                    pagination = {
                        total: 1,
                        page
                    }
                } else {
                    pagination =  {
                        total: Math.ceil(recipes[0].total / limit),
                        page
                    }
                }
                // Recipe.findChef(req.params.id, function(chef) {
                //     console.log(chef)
                //     return res.render("admin/recipes/index", { recipes, pagination, filter, chef})
                // })

                return res.render("filter_recipes", { recipes, pagination, filter})
            }
        }

        Recipe.paginate(params)
    },
    create(req, res) {
        Recipe.chefsSelectOptions(function(options) {
            return res.render('admin/recipes/create', { chefsOptions: options })
        })
    },
    show(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found!")
            // console.log(chef)
            // Recipe.findChef(req.params.id, function(chef) {
            //     console.log(chef)
            //     return res.render("admin/recipes/show", { recipe, itens, chef})
            // })
            return res.render("admin/recipes/show", { recipe, itens})
        })
    },
    showSite(req, res) {
        Recipe.find(req.params.id, function(recipes) {
            if(!recipes) return res.send("Recipe not found!")
            // console.log(chef)
            // Recipe.findChef(req.params.id, function(chef) {
            //     console.log(chef)
            //     return res.render("admin/recipes/show", { recipe, itens, chef})
            // })
            return res.render("recipe", { recipes, itens})
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Recipe.create(req.body, function(recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    edit(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found!")
            Recipe.chefsSelectOptions(function(options) {
                return res.render('admin/recipes/edit', { recipe, chefsOptions: options })
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Recipe.update(req.body, function(recipe) {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res) {
        Recipe.delete(req.body.id, function(recipe) {
            return res.redirect("/admin/recipes")
        })
    }
}

// exports.index = function(req, res) {
//     return res.render("admin/recipes/index", { recipes: data.recipes })
// }

// exports.create = function(req, res) {
//     return res.render("admin/recipes/create")
// }

// exports.show = function(req, res) {

    // Solução pegando pelo index, porém quando é para Editar ou Excluir não consegui ajustar de pegar pelo index.
    // const recipes = data.recipes
    // const recipeIndex = req.params.id
    // const recipe = data.recipes.find(function(recipe){
    //     return recipe == recipes[recipeIndex]
    // })

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

//     return res.render("admin/recipes/show", { recipe, itens })
// }

// exports.post = function(req, res) {
//     const keys = Object.keys(req.body)

//     for (key of keys) {
//         if (req.body[key] == "")
//             return res.send("Please, fill all fields!!")
//     }

//     // Desestruturando o req.body
//     // const { title, author, image, preparation, information, ingredients } = req.body

//     let id = 1
//     const lastRecipe = data.recipes[data.recipes.length - 1]

//     if (lastRecipe) {
//         id = lastRecipe.id + 1
//     }
    
//     data.recipes.push({
//         id,
//         ...req.body,
//     });

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write File error!")

//         return res.redirect("/admin/recipes")
//     })
// }

// exports.edit = function(req, res) {
//     const { id } = req.params

//     const foundRecipe = data.recipes.find(function(recipe) {
//         return recipe.id == id
//     })

//     if (!foundRecipe) return res.send("Recipe not found!")

//     const recipe = {
//         ...foundRecipe
//     }

//     return res.render('admin/recipes/edit', { recipe })
// }

// exports.put = function(req, res) {
//     const { id } = req.body

//     let index = 0

//     const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
//         if (id == recipe.id) {
//             index = foundIndex
//             return true
//         }
//     })

//     if (!foundRecipe) return res.send("Recipe not found!")

//     const recipe = {
//         ...foundRecipe,
//         id: Number(req.body.id)
//     }

//     data.recipes[index] = recipe

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write error!")

//         return res.redirect(`/admin/recipes/${id}`)
//     })
// }

// exports.delete = function(req, res) {
//     const { id } = req.body

//     const filteredRecipes = data.recipes.filter(function(recipe) {
//         return recipe.id != id
//     })

//     data.recipes = filteredRecipes

//     fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err) {
//         if (err) return res.send("Write file error!")

//         return res.redirect("/admin/recipes")
//     })
// }