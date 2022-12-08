const sql = require('./db')

const User = function(user) {
    this.user_id = user.user_id
    this.username = user.username
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.current_password = user.current_password
}

User.findByUsername = (username, result) => {
    const query = "select user_id, username, first_name, last_name, upper(hex(current_password)) as current_password from user where username = ?"

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
    const query = "select case when count(*) = 1 then true else false end as found_user from user u where u.username = ?"

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
    const query = "insert into user (username, first_name, last_name, current_password) values (?, ?, ?, UNHEX(?))"

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