const  express = require('express')
const {dbConnection} = require('../database/config')
const cors = require('cors')

class Server 
{
    constructor()
    {
        this.app = express()
        this.port = process.env.PORT
        this.connectDB()
        this.routes()
        this.middlewares()
    }

    async connectDB()
    {
        await dbConnection()
    }

    routes()
    {  
        
        this.app.use('/api/auth', require('../routes/auth.routes'))
        this.app.use('/api/users', require('../routes/user.routes'))
        this.app.use('/api/products', require('../routes/products.routes'))
        this.app.use('/api/categories', require('../routes/category.routes')) 
    }

    middlewares()
    {
        this.app.use(cors()) 
    }

    listen()
    {
        this.app.listen(this.port, () =>
        {
            console.log(`This server is running on port ${this.port}`)
        })
    }
}

module.exports = Server