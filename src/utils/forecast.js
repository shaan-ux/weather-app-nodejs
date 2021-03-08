const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1b5cb5cb4f52b15ab054c2b5652c4484&query=${latitude},${longitude}&units=f`;

    request({url, json:true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to weather service!');
        }

        else if(body.error) {
            callback('Unable to find Location');
        }

        else {
            let current = body.current;
            callback(undefined, `${current.weather_descriptions[0]}\nIt's ${current.temperature} degree Fahrenheit and there is ${current.precip}% chance of rain. The time is ${current.observation_time}`);
        }
    });
}

module.exports = forecast;