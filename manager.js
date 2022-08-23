const fs = require('fs')
/**
 * Schema
 *  user = {
 *      first_name: String (required)
 *      last_name: String
 *      username: String (required)
 *      age: Number
 *      mail: String (required)
 *  }
 */

const pathToFile = './users.json'

class Manager {
    createUser = async (user) => {
        //Validations
        if (!user.first_name || !user.username || !user.mail) return {status: "error", message: "missing fields"}
        try {
            if (fs.existsSync(pathToFile)) {
                // fs.appendFile
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let users = JSON.parse(data)
                let id = users[users.length-1].id+1
                user.id = id
                users.push(user)
                await fs.promises.writeFile(pathToFile, JSON.stringify(users, null, 2))
                return {status: "success", message: "User created"}
            } else {
                user.id = 1
                await fs.promises.writeFile(pathToFile, JSON.stringify([user], null, 2))
                return {status: "success", message: "User created"}
            }
        } catch(err) {
            return {status: "error", message: err.message}
        }
    }

    findAll = async () => {
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            return {status: "success", message: users}
        } else {
            return {status: "error", message: err.message}
        }
    }

    findById = async (id) => {
        //Validation
        if (!id) return {status: "error", message: "Id required"}
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            let user = users.find(user => user.id === id)
            if (user) return {status: "succes", message: user}
            return {status: "error", message: "User not found"}
        } else {
            return {status: "error", message: err.message}
        }
    }

    updateUser = async (id, updatedUser) => {
        //Validation
        if (!id) return {status: "error", message: "Id required"}
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            let newUsers = users.map(user => {
                if (user.id === id) {
                    updatedUser.id = id
                    return updatedUser
                } else return user
            })
            await fs.promises.writeFile(pathToFile, JSON.stringify(newUsers, null, 2))
            return {status: "success", message: "User updated!"}
        } else {
            return {status: "error", message: err.message}
        }        
    }

    deleteUser = async (id) => {
        //Validation
        if (!id) return {status: "error", message: "Id required"}
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            let newUsers = users.filter(user => user.id !== id)
            await fs.promises.writeFile(pathToFile, JSON.stringify(newUsers, null, 2))
            return {status: "success", message: "User deleted!"}
        } else {
            return {status: "error", message: err.message}
        }
    }
}

module.exports = Manager