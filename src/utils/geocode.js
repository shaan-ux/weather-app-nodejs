const request = require('postman-request');
const geocode = (address, callback) => {
    
    address = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibGliZXJ0eWNpdHkiLCJhIjoiY2tsMm1ycGdiMGJzcjMzbW5oZDJncHU4diJ9.74xIai6kdPIK4hkWj8JW_A&limit=1`;

    request({url, json:true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to geolocation service!');
        }

        else if(body.features.length === 0) {
            callback('Unable to find coordinates');
        }

        else {
            const latitude = body.features[0].center[1];;
            const longitude = body.features[0].center[0];
            const location  = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
}

module.exports = geocode;