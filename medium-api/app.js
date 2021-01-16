import bodyParser from 'body-parser'
import routes from '../mediumApi'
import express from 'express'

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

let server = app.listen(3000, () => {
    console.log("Medium Scraper running on port: ", server.address().port);
})  