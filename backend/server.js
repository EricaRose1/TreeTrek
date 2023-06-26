const express = require('express');
const cors = require('cors');
const app = express()
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('./db')

const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config();
app.use(cors())
app.use(express.json())


const SECRET = process.env.REACT_APP_API_KEY || "test";

const PORT = process.env.PORT || 3001;

// get checklists
app.get('/campinglist/:userEmail', async (req, res) =>{
    
    const { userEmail } = req.params
    
    try{
        const campinglist = await pool.query('SELECT * FROM campinglist WHERE user_email = $1', [userEmail])
        res.json(campinglist.rows)
    } catch(error) {
        console.error(error)
    }
})

// create an item for CampingList
app.post('/campinglist', async (req,res) => {
    const { user_email, title, date } = req.body
    console.log(user_email, title, date)
    const id = uuidv4()
    try{
        const newItem = await pool.query(`INSERT INTO campinglist(id, user_email, title, date) VALUES($1, $2, $3, $4)`,
        [id, user_email, title, date])
        res.json(newItem)
    } catch(err) {
        console.error(err)
    }
})

// remove item from campinglist
app.delete('/campinglist/:id', async (req, res) => {
    const { id } = req.params
    try{
        const deleteItem = await pool.query(`DELETE FROM campinglist WHERE id = $1`, [id])
        res.json(deleteItem )
    } catch(err) {
        console.error(err)
    }
})

// SIGNUP
app.post('/signup', async (req, res) => {
    const {email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try{
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, 
            [email, hashedPassword])
        const token = jwt.sign({email}, 'secret', { expiresIn: '1hr' })
        res.json({email, token})

    } catch(err) {
        console.error(err)
        if(err) {
            res.json({detail: err.detail})
        }
    }
})

// LOGIN
app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try{
        const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

        if(!users.rows.length) return res.json({ detail: 'User does not exist' })

        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret', { expiresIn: '1hr' })
        if(success) {
            res.json({'email' : users.rows[0].email, token})
        }else {
            res.json({ detail: 'Login Failed' })
        }

    } catch(err) {
        console.error(err)
    }
})

// get list of parks from API
app.get('/parks', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://developer.nps.gov/api/v1/parks?limit=50',
        headers: {
            'X-API-Key': SECRET
        }
    }
    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    })
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
