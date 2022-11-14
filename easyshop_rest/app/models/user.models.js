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

module.exports = User