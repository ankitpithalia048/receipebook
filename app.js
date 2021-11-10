const client = require('./connection.js')
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

//get all recipe
app.get('/recipe', (req, res)=>{
    client.query(`Select * from receipe`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
    });
    client.end;
});
// client.connect();

//get recipe by id
app.get('/recipe/:id', (req, res)=>{
    client.query(`Select * from receipe where "Id" = ${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
    });
    client.end;
});


//add a recipe
app.post('/recipe', (req, res)=> {
    const recipe = req.body;
    console.log(recipe);
    // console.log(recipe.Id);
    // console.log(recipe.name);
    // console.log(recipe.ingredients);
    // console.log(recipe.direction);

    let insertQuery = `INSERT INTO receipe("Id", name, "ingredients ", direction)
                       values(${recipe.Id}, '${recipe.name}', '${recipe.ingredients}', '${recipe.direction}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err);}
    })
    client.end;
})


//update the user
app.put('/recipe/:id', (req, res)=> {
    let recipe = req.body;
    console.log(recipe);
    let updateQuery = `update receipe
                       set name='${recipe.name}', "ingredients " = '${recipe.ingredients}', direction='${recipe.direction}'
                       where "Id" = ${recipe.Id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();