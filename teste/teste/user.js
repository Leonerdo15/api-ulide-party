const client = require('/database/connection')
const express = require('express');
const {log} = require("debug");
const app = express();
const url = require('url');
const md5 = require('md5');



client.connect();


const getUsers = (req, res) => {
  // function users(dbUser){
  //   let user = {
  //     us_id:""
  //   }
  // }

  client.query('SELECT * from users inner join type_users tu on users.us_tu_id = tu.tu_id', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('SELECT * FROM users WHERE us_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getLoginAuthentication = (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  console.log(queryObject.us_name)
  console.log(Object.keys(queryObject)[0])

  let query = `SELECT us_id FROM users`
  query += ` WHERE ${Object.keys(queryObject)[0]} = ${ "'" + queryObject[Object.keys(queryObject)[0]] + "'" }`

  for (let i = 1; i < Object.keys(queryObject).length; i++) {
    query += ` AND ${Object.keys(queryObject)[i]} = ${ "'" + md5(queryObject[Object.keys(queryObject)[i]]) + "'" }`
  }

  console.log(query)
  client.query(query, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const queryObject = req.body;
  console.log(queryObject)

  let query1 = 'INSERT INTO users ('
  let query2 = ' ) VALUES ('

  if (Object.keys(queryObject)[0] === "us_password"){
    query1 += `${Object.keys(queryObject)[0]}, `
    query2 += `${ "'" + md5(queryObject[Object.keys(queryObject)[0]]) + "', " }`
  }else {
    query1 += `${Object.keys(queryObject)[0]}, `
    query2 += `${ "'" + queryObject[Object.keys(queryObject)[0]] + "', " }`
  }

  for (let i = 1; i < Object.keys(queryObject).length; i++) {
    if (Object.keys(queryObject)[i] === "us_password"){
      query1 += `${Object.keys(queryObject)[i]}, `
      query2 += `${ "'" + md5(queryObject[Object.keys(queryObject)[i]]) + "', " }`
    }else {
      query1 += `${Object.keys(queryObject)[i]}, `
      query2 += `${ "'" + queryObject[Object.keys(queryObject)[i]] + "', " }`
    }
  }

  query1 = query1.substring(0, query1.length - 2)
  query2 = query2.substring(0, query2.length - 2)
  query2 += ')'

  fullQuery = query1+query2
  console.log(fullQuery)

  client.query(fullQuery, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  client.query(
      'UPDATE users SET us_name = $1, us_email = $2 WHERE us_id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('DELETE FROM users WHERE us_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLoginAuthentication,
}