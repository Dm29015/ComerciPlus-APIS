const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const bodyParser = require('body-parser');

class Server{
    constructor(){
        this.app = express();
        hbs.registerPartials(__dirname + '/views/partials', function (err) { console.log(err); });
        this.app.set('view engine', 'hbs');
        this.app.set("views",__dirname + '/views');
        this.app.use(cors());
        this.app.engine('hbs', hbs.__express)

        this.app.use(express.static('src/public'))

        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.port = process.env.PORT 
        this.routers();
    }

    routers(){
        this.app.get('/',require('./routers/delitosRouters'));
        this.app.get('/buscarDelitos',require('./routers/delitosRouters'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`);
        })
        // this.app.listen(this.API, () => {})
    }
    

}

module.exports = Server;