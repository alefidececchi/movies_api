const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
async function verify(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  
        });
        return ticket.getPayload();
    } catch (error) {
        console.log(error, 'Hubo un error al verificar el token')
    }
}

module.exports = verify