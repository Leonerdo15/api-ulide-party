const client = require('/database/connection')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getSpots = (request, response) => {
    client.query('select *, st_x(sp_location) sp_lat, st_y(sp_location) sp_long from spots', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSpotsArea = (request, response) => {
    const lat = parseFloat(request.params.lat)
    const long = parseFloat(request.params.long)
    const dist = parseFloat(request.params.dist)

    const query = `with data as( select st_astext(ST_Buffer( ST_GeomFromText(\'POINT(${lat} ${long})\'), ${dist}, \'quad_segs=8\')) circ ) select ST_AsText(ST_Intersection(sp_location, data.circ::geometry)) from spots, data;`

    console.log(lat, long, dist, " ---------------------------------------------------> aqui")

    client.query(query, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSpotById = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('UPDATE spots SET sp_views = sp_views + 1 WHERE sp_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        } client.query('SELECT * FROM spots WHERE sp_id = $1',[id], (error, results) =>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })

    })
}

const createSpot = (request, response) => {
    const users = request.body

    client.query('INSERT INTO users (us_name, us_email) VALUES ($1, $2)', [users.us_name, users.us_email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: `)
    })
}

const updateSpot = (request, response) => {
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

const deleteSpot = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('DELETE FROM spots WHERE sp_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getSpots,
    getSpotsArea,
    getSpotById,
    createSpot,
    updateSpot,
    deleteSpot,
}