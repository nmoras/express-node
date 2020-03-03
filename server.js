const express = require("express");
const path = require("path");
const util = require("util")
const fs = require("fs")
// const writeFileAsync = util.promisify(fs.writeFile);
// const writeFileSync = util.promisify(fs.writeFile);
// const appendFileAsync = util.promisify(fs.appendFile);
// const readFileAsync = util.promisify(fs.readFile);

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//USERS
let i = 1;
let notes = [];

//API ROUTES

app.get('/api/notes', function (req, res) {
    let notesRead = fs.readFileSync("db/db.json", "utf8");
    // console.log(notesRead);
    let notesReadParse = JSON.parse(notesRead);
    // console.log(` the parsed array is ${notesReadParse}`)
    // let notesReadParse = JSON.parse(notesRead);
    //     console.log(`notesRead ${notesReadParse}`);
    // res.send(notesReadParse);
    res.json(notesReadParse)
});

//   

app.post('/api/notes', function (req, res) {
    console.log(req.body);
    notes.push(req.body);
    let storeNotesJSON = JSON.stringify(notes);
    // let i = 0;
    // notes.map(n => {
    // n['id'] = i;
    // i++;
    // })

    //   console.log(`storenotesjson is: ${storeNotesJSON}`);
    fs.writeFileSync('db/db.json', storeNotesJSON);
    // let notesRead = fs.readFileSync("db/db.json", "utf8");
    // let notesReadParse = JSON.parse(notesRead);
    // res.send(notesReadParse);
    res.json(notes);
    //going to add to users
});

app.delete('/api/notes/:id', function (req, res) {
    notes = [];
    const searchID = req.params.id;
    let delnotesRead = fs.readFileSync("db/db.json", "utf8");
    let delnotesReadParse = JSON.parse(delnotesRead);
    // console.log(`the parsed array for delete is ${delnotesReadParse}`);
    // console.log( `[/api/notes/:id] searchID=${searchID}` );

    // for( i = 0; i < delnotesReadParse.length; i++){
    //     if (searchID == delnotesReadParse[i].id){
    var notesFilter = delnotesReadParse.filter((item) => { 
        return item.id !== searchID;
    });
    //     }
    // }
    let filterNotesJSON = JSON.stringify(notesFilter);
    fs.writeFileSync('db/db.json', filterNotesJSON);
    console.log(`filtered array is ${filterNotesJSON}`);

    res.json(notes);
});


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});