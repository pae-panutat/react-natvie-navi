const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test-react'
})

/* app.use((req, res, next) => {
    res.setHeader("Acecess-Control-Allow-Origin", "*")
    next()
}) */

app.post('/post', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile

    db.query('INSERT INTO tbl_detail (name,email,mobile) VALUES (?,?,?)', 
    [name, email, mobile], (err, results) => {
        if (err) {
            console.log(err)
        } else {
            //res.json(results)
            res.send('สำเร็จในการเพิ่มข้อมูล')
        }
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile

    let form_data = {
        name: name,
        email: email,
        mobile: mobile
    }

    db.query('UPDATE tbl_detail SET ? WHERE id =' + id, form_data, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            res.send('สำเร็จในการแก้ไขข้อมูล')
        }
    })
})


app.get('/fetch', (req, res) => {
    db.query('SELECT * FROM tbl_detail' , (err, results) => {
        if (err) {
            console.log(err)
        } else {
            res.json(results)
        } 
    })
})


app.get('/fetchById/:id', (req, res) => {
    let id = req.params.id

    db.query('SELECT * FROM tbl_detail where id = ?', id , (err, results) => {
        if (err) {
            console.log(err)
        } else {
            res.json(results)
        } 
    })
})

app.delete('/delete/(:id)', (req, res) => {
    let id = req.params.id
        if (!id) {
            console.log('error')
        } else {
            db.query('DELETE FROM tbl_detail WHERE id = ?', id, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Delete Successfully')
            }
        })
    }
})

app.listen(5000 ,() => {
    console.log('running port 5000')
})