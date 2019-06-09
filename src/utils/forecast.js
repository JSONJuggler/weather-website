const request=require('request')

const forecast = (latitude, longitude, callback) => {
    const url='https://api.darksky.net/forecast/a2569f43043975a58c7f8fd524710c6a/' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' + 'There is a ' + body.currently.precipProbability + ' chance of rain. The high for the day is ' + body.daily.data[0].temperatureHigh + ' degrees with a low of ' + body.daily.data[0].temperatureLow + ' degrees.' )
        }
        
    })
}

//const url = 'https://api.darksky.net/forecast/a2569f43043975a58c7f8fd524710c6a/37.8267,-122.4233'

// request({ url: url, json:true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather services!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log('It is currently ' + response.body.currently.temperature + ' degrees out.')
//         console.log('There is a ' + response.body.currently.precipProbability + ' chance of rain.')
//         console.log(response.body.daily.data[0].summary)
//     }
// })

module.exports = forecast