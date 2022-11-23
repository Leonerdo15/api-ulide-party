const client = require('/database/connection')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getFavRoutes = (request, response) => {
    client.query('SELECT * FROM fav_routes', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getFavRouteById = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('SELECT * FROM fav_routes WHERE us_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createFavRoute = (request, response) => {
    // const users = request.body
    //
    // client.query('INSERT INTO users (us_name, us_email) VALUES ($1, $2)', [users.us_name.toString(), users.us_email.toString()], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     response.status(201).send(`User added with ID: `)
    // })
}

const updateFavRoute = (request, response) => {
    // const id = parseInt(request.params.id)
    // const { name, email } = request.body
    //
    // client.query(
    //     'UPDATE users SET us_name = $1, us_email = $2 WHERE us_id = $3',
    //     [name, email, id],
    //     (error, results) => {
    //         if (error) {
    //             throw error
    //         }
    //         response.status(200).send(`User modified with ID: ${id}`)
    //     }
    // )
}

const deleteFavRoute = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('DELETE FROM fav_routes WHERE us_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getFavRoutes,
    getFavRouteById,
    createFavRoute,
    updateFavRoute,
    deleteFavRoute,
}