import Medium from  './mediumApi'
import keys from './src/keys'




let fs = require('fs')

const returnFilteredOutBrands = (i) => !gapBrands.includes(i.user.screen_name) && !i.user.screen_name.includes('Athleta')


let CronJob = require('cron').CronJob;



let everySecond = '* * * * * *'


let job = new CronJob(everySecond, () => {
  client.get('search/posts', {q: myQuery, count: 10,  lang: 'en'} ,(error, posts, response) => {

    let myMap = posts.statuses.map((i) =>  i)
    let filteredObjcet = myMap.filter((i) => returnFilteredOutBrands(i))

    let today = new Date();
    let toAppend =  today+ ", " + filteredObjcet.length  +"\r\n"

    fs.appendFile('log.txt',toAppend, (err) => err ? console.log(err) : null)
  })
  }, () => console.log('done'), true
);

