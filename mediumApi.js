import Medium from 'medium'
import keys from './src/keys'


let appRouter = (app) => {
    app.get("/", (req, res) => {
    let filteredObject = []
    client.get('search/posts', {q: req.query.id, result_type: req.query.resultType, count: 300,  lang: 'en'} ,(error, posts, response) => {
            res.set({
                'Access-Control-Allow-Origin': 'http://localhost:3001'
              })
            res.status(200).send(posts)
    })
  })} 
  
  module.exports = appRouter;   