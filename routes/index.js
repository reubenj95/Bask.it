const express = require('express')
const router = express.Router()
const {
  connection,
  checkPantry,
  addToPantry,
  displayPantry,
  getPantryItem,
} = require('../database.js')
const { parseFridgeInput } = require('../helpers/parseInput.js')

//Placeholder for DB
connection.connect()

//////////////////////////////////
///// CRUD for Fridge List ///////
//////////////////////////////////

// Create
router.post('/', async (req, res) => {
  //Database logic to add new pantry item, which is associated with the current fridge list.
  let input = parseFridgeInput(req.body.newItem)
  let pantryItem = await checkPantry(input[0])
  console.log(pantryItem)
  if (pantryItem.length === 0) {
    await addToPantry(input)
  }
  res.redirect('/')
})

// Read
router.get('/', async function (req, res, next) {
  let list = await displayPantry()
  document.querySelectorAll('.pantryItem'),
    forEach((element) =>
      element.addEventListener('touchend', function (event) {
        handleSwipe(event)
      })
    )
  res.render('index', { list })
  // res.send(list)
})

// Update
router.get('/pantry/:itemId', async function (req, res) {
  let { itemId } = req.params
  let pantryItem = await getPantryItem(itemId)
  res.render('pantryItem', { pantryItem })
})

//Delete

module.exports = router

// SELECT CONCAT('GRANT SELECT, SHOW VIEW ON Reports.`', TABLE_NAME, '` to ''baskit_admin''@`localhost`;')
// FROM INFORMATION_SCHEMA.TABLES
// WHERE TABLE_SCHEMA = 'groceries_app';

// GRANT SELECT, SHOW VIEW ON groceries_app.`brands` to 'baskit_admin'@`localhost`;
// GRANT SELECT, SHOW VIEW ON groceries_app.`categories` to 'baskit_admin'@`localhost`;
// GRANT SELECT, SHOW VIEW ON groceries_app.`lists` to 'baskit_admin'@`localhost`;
// GRANT SELECT, SHOW VIEW ON groceries_app.`pantry` to 'baskit_admin'@`localhost`;
// GRANT SELECT, SHOW VIEW ON groceries_app.`recipes` to 'baskit_admin'@`localhost`;
// GRANT SELECT, SHOW VIEW ON groceries_app.`supermarkets` to 'baskit_admin'@`localhost`;
