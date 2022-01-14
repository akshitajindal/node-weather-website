const request = require('request')

const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYWtzaGl0YS1qaW5kYWwiLCJhIjoiY2t5MWZ3MHRtMGIzMzJycW5rd2NndjFtciJ9.KItibmLnKM94agkeFuvMZA&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWtzaGl0YS1qaW5kYWwiLCJhIjoiY2t5MWZ3MHRtMGIzMzJycW5rd2NndjFtciJ9.KItibmLnKM94agkeFuvMZA&limit=1'
    //we use the function instead of just the address variable because that functions returns the string value of an object with respect to a URL. i.e. it will convert special characters to url format.
    /*request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!',undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //we callback with the first argument i.e. error here as undefined. Beacuse for this case there is no error.
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })*/

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to location services!',undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //we callback with the first argument i.e. error here as undefined. Beacuse for this case there is no error.
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode