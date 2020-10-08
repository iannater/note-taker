const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");


router.get("/notes", (req,res) => {
    let data = fs.readFileSync("db/db.json", "utf8")
    console.log(data)
    return res.json(JSON.parse(data));
});

router.post("/notes", (req,res) =>{
  //  console.log(req.body)
  const { title, text } = req.body;

  const newNote = { title, text , id: uuidv4()}
    let data = JSON.parse(fs.readFileSync("db/db.json", "utf8"))
    let updatedNotes = [...data, newNote];
    fs.writeFileSync("db/db.json", JSON.stringify(updatedNotes));
    return res.json(newNote)

})


router.delete("/notes/:id", (req, res) => {
    let deleteNoteID = req.params.id;
    console.log(deleteNoteID);
    let data = fs.readFileSync("db/db.json", "utf8")
    console.log(data)
    let notes = JSON.parse(data)
    const filteredNote = notes.filter(values => values.id != deleteNoteID);
    fs.writeFileSync("db/db.json", JSON.stringify(filteredNote));
});

module.exports = router;