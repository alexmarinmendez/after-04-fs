const Manager = require('./manager.js')
const manager = new Manager()

let user = {
    first_name: "Jorge",
    last_name: "Valle",
    username: "jorgito",
    age: 15,
    mail: "jorgito@coderhouse.com"
}

// manager.createUser(user).then(result => console.log(result))
// manager.findAll().then(result => console.log(result))
// manager.findById(2).then(result => console.log(result))
// manager.updateUser(3, user).then(result => console.log(result))
manager.deleteUser(2).then(result => console.log(result))