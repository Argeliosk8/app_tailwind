const bcrypt = require('bcrypt')


exports.listDatabases = async (client) => {
    const databaseList = await client.db().admin().listDatabases()
    console.log("Databases: ")
    databaseList.databases.forEach((db) => {
      console.log(` - ${db.name}`);  
    }); 
  }

exports.checkHash = (password, hash) => {
  const result = bcrypt.compare(password, hash, (err, result) => result)
  return result
}