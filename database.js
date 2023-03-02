const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'groceries_app',
})

async function displayPantry() {
  console.log('Display pantry executed')
  try {
    let response = await connection
      .promise()
      .query(`SELECT * FROM ??;`, ['pantry', 'name'])
    return response[0]
  } catch (err) {
    console.log(err)
  }
}

async function checkPantry(itemName) {
  console.log('Check pantry executed')
  try {
    let response = await connection
      .promise()
      .query(`SELECT * FROM ?? WHERE ?? = ?;`, [
        'pantry',
        'name',
        itemName.toLowerCase(),
      ])

    return response[0]
  } catch (err) {
    console.log(err)
  }
}

async function getPantryItem(id) {
  try {
    let response = await connection
      .promise()
      .query(`SELECT * FROM ?? WHERE ?? = ?;`, ['pantry', 'id', id])
    return response[0]
  } catch (err) {
    console.log(err)
  }
}

async function addToPantry(itemName) {
  console.log('Add to pantry executed')
  try {
    let qty
    if (itemName[1]) {
      qty = itemName[1]
    } else {
      qty = 1
    }
    let response = await connection
      .promise()
      .query('INSERT INTO ??(??,??) VALUES (?,?)', [
        'pantry',
        'name',
        'quantity',
        itemName[0].toString().toLowerCase(),
        qty,
      ])
    console.log(response)
    return response[0]
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connection: connection,
  checkPantry: checkPantry,
  addToPantry: addToPantry,
  displayPantry: displayPantry,
  getPantryItem: getPantryItem,
}

//INSERT INTO 'pantry'('name','quantity') VALUES ('apple',1);
