const sql = require('./db')

const User = function(user) {
    this.user_id = user.user_id
    this.username = user.username
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.current_password = user.current_password
}

User.findByUsername = (username, result) => {
    const query = "call get_user_from_username(?)"

    sql.query(query, username, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found user: " + JSON.stringify(res[0]))
            result(null, res[0])
            return
        }

        result({kind: 'not_found'}, null)
    })
}

User.checkUserDetailsExist = (username, result) => {
    // Check if user exists, if not return a value to tell the client and the /register route 
    // that the user already exists
    const query = "call get_user_exists_from_username(?)"

    sql.query(query, username, (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found user: " + JSON.stringify(res[0]))
            result(null, res[0])
            return
        }

        result({kind: 'not_found'}, null)
    })
}

User.insertUser = (user, result) => {
    const query = "call insert_user(?, ?, ?, UNHEX(?))"

    sql.query(query, [user.username, user.first_name, user.last_name, user.password], (err, res) => {
        if (err) {
            console.log("Error: " + err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

module.exports = User