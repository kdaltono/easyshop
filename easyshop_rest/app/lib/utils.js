const jsonwebtoken = require('jsonwebtoken')

function issueJWT(user) {
    const username = user.username
    const expiresIn = '1d'

    const payload = {
        sub: username,
        iat: Math.floor(Date.now() / 1000),
        content: {
            user: {
                username: username,
                user_id: user.user_id
            }
        }
    }

    const signedToken = jsonwebtoken.sign(
        payload, 
        'TempPhraseToChange', 
        { 
            expiresIn: expiresIn, 
            algorithm: 'HS256' 
        }
    )

    return {
        token: "Bearer " + signedToken,
        user_id: user.user_id,
        full_name: `${user.first_name} ${user.last_name}`,
        expires: expiresIn
    }
}

function isValidPassword(password, current_password) {
    console.log(`${password}=${current_password}`)
    return (password === current_password)
}

function getUserContentFromPayload(token) {
    let decoded = ''
    if (token.startsWith('Bearer')) {
        decoded = jsonwebtoken.decode(token.substring(7, token.length))
    } else {
        decoded = jsonwebtoken.decode(token)
    }

    return decoded.content.user ? decoded.content.user : ''
}

module.exports.issueJWT = issueJWT
module.exports.isValidPassword = isValidPassword
module.exports.getUserContentFromPayload = getUserContentFromPayload