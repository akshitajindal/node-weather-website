const request = require('request')

const forecast = (latitude, longitude, callback) => {
    /*const url = 'http://api.weatherstack.com/current?access_key=110f5ad611431a874e4ab8ce17bebc87&query='+ latitude +','+ longitude +'&units=f'
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })*/

    const url = 'http://api.weatherstack.com/current?access_key=110f5ad611431a874e4ab8ce17bebc87&query='+ latitude +','+ longitude +'&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast