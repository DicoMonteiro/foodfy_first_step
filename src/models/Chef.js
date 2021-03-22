const db = require("../config/db")
const { date } = require("../lib/utils")

module.exports = {
    all(callback) {
        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id`, function(err, results) {
                if (err) throw `Database Error!! ${err}`
                callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            // if (err) return res.send("Database Error!!")
            if (err) throw `Database Error!! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`, [id], function(err, results) {
                // if (err) return res.send("Database Error!!")
                if (err) throw `Database Error!! ${err}`
                callback(results.rows[0])
        })
    },
    findRecipes(id, callback) {
        // { return db.query(`
        //     SELECT *
        //     FROM recipes
        //     WHERE chef_id = $1`, [id]) }

        db.query(`
            SELECT recipes.*
            FROM recipes
            WHERE chef_id = $1`, [id], function(err, results) {
                // if (err) return res.send("Database Error!!")
                if (err) throw `Database Error!! ${err}`
                callback(results.rows)
        })
    },
    findBy(filter, callback) {
        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.name ILIKE '%${filter}%' 
            OR chefs.services ILIKE '%${filter}%'
            GROUP BY chefs.id
            ORDER BY total_recipes DESC`, function(err, results) {
            // if (err) return res.send("Database Error!!")
            if (err) throw `Database Error!! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE chefs SET
            avatar_url=($1),
            name=($2)
            WHERE id = $3
        `

        const values = [
            data.avatar_url,
            data.name,
            data.id
        ]

        db.query(query, values, function(err, results) {
            // if (err) return res.send("Database Error!!")
            if (err) throw `Database Error!! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database Error!! ${err}`

            callback()
            
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM chefs
            ) AS total`

        if ( filter ) {
            filterQuery = `
                WHERE chefs.name ILIKE '%${filter}%'
                OR chefs.services ILIKE '%${filter}%'
            `
            totalQuery = `(
                SELECT count(*) FROM chefs
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT chefs.*, ${totalQuery}, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            ${filterQuery}
            GROUP BY chefs.id LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database Error!! ${err}`
            callback(results.rows)
        })
    }
}