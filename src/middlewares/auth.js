const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken')
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

async function verifyTokenGoogle(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        console.log('TICKET', ticket)
        return ticket.getPayload();
    } catch (error) {
        console.log(error, 'Hubo un error al verificar el token ID')
    }
}

function verifyAdminToken(autorizationToken = '') {

    let decoded;
    let token = null;
    if (autorizationToken && autorizationToken.startsWith('Bearer ')) {
        token = autorizationToken.split(' ')[1]
    }
    if (token !== null) {
        decoded = jwt.verify(token, process.env.SECRET)
    }
    return decoded.role === 'ADMIN'
}

function verifyTokenLogoutSession(authorizationToken, id) {
    console.log('Authorization token: ', authorizationToken)
    console.log('ID: ', id)
    let decoded;
    let token = null;
    
    if (authorizationToken && authorizationToken.startsWith('Bearer ')) {
        token = authorizationToken.split(' ')[1]
    }
    if (token !== null) {
        decoded = jwt.verify(token, process.env.SECRET)
    }
    console.log(decoded)
    return decoded.id === id
}


module.exports = {
    verifyAdminToken,
    verifyTokenGoogle,
    verifyTokenLogoutSession
}