// const fs = require("fs")
// const data = require("../../../data")

const { age, date } = require("../../lib/utils")
const Chef = require("../../models/Chef")

const itens = {
    subtitle: ["Chef:", "receitas"],
    editBtn: "Editar chef"
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
            callback(chefs) {
                if (!chefs) return res.send("Chef not found!")
                
                let pagination = ""
                
                if (chefs.length == 0) {
                    pagination = {
                        total: 1,
                        page
                    }
                } else {
                    pagination =  {
                        total: Math.ceil(chefs[0].total / limit),
                        page
                    }
                }

                return res.render("admin/chefs/index", { chefs, pagination, filter })
            }
        }

        Chef.paginate(params)

        // Chef.find(req.params.id, function(chef) {
        //     if(!chef) return res.send("Chef not found!")
        //     return res.render("admin/chefs/index", { chefs,  })
        // })

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
            callback(chefs) {
                if (!chefs) return res.send("Chef not found!")
                
                let pagination = ""
                
                if (chefs.length == 0) {
                    pagination = {
                        total: 1,
                        page
                    }
                } else {
                    pagination =  {
                        total: Math.ceil(chefs[0].total / limit),
                        page
                    }
                }

                return res.render("chefs", { chefs, pagination, filter, itens})
            }
        }

        Chef.paginate(params)

        // Chef.find(req.params.id, function(chef) {
        //     if(!chef) return res.send("Chef not found!")
        //     return res.render("admin/chefs/index", { chefs,  })
        // })

    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    show(req, res) {
        chefs = []
        recipes = []
        Chef.find(req.params.id, function(chefs) {
            if(!chefs) return res.send("Chef not found!")
            // return res.render("admin/chefs/show", { chefs, itens })
            console.log(chefs)
            chefs = chefs
        })
        Chef.findRecipes(req.params.id, function(recipes) {
            if(!recipes) return res.send("Recipes not found!")
            console.log(recipes)
            recipes = recipes
            // return res.render("admin/chefs/show", { recipes })
        })

        // results = await Chef.findRecipes(req.params.id)
        // const recipes = results.rows
        // console.log(recipes)
        return res.render("admin/chefs/show", { chefs, itens, recipes })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Chef.create(req.body, function(chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },
    edit(req, res) {
        Chef.find(req.params.id, function(chef) {
            if(!chef) return res.send("Chef not found!")
            return res.render("admin/chefs/edit", { chef })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Chef.update(req.body, function(chef) {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chef.delete(req.body.id, function(chef) {
            return res.redirect("/admin/chefs")
        })
    }
}



// exports.index = function(req, res) {
//     return res.render("admin/chefs/index", { recipes: data.recipes })
// }

// exports.create = function(req, res) {
//     return res.render("admin/chefs/create")
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

//     return res.render("admin/chefs/show", { recipe, itens })
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

//         return res.redirect("/admin/chefs")
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

//     return res.render('admin/chefs/edit', { recipe })
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

//         return res.redirect(`/admin/chefs/${id}`)
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

//         return res.redirect("/admin/chefs")
//     })
// }