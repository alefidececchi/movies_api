require('dotenv').config()
const app = require('./src/app.js')
const PORT = process.env.PORT || 3001
const main = require('./src/database.js')


app.listen(PORT, () => {
    main()
    console.log('Escuchando en el puerto', PORT);
})