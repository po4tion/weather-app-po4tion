const request = require('request');

const forecast = (lat, lon, callback) => {
  // weatherstack uri
  const url = `http://api.weatherstack.com/current?access_key=9af5b906c999cccad566ff5cf5720a10&query=${lat},${lon}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('연결 상태를 확인해주세요', undefined);
    } else if (body.error) {
      callback('위치 정보 연결 상태를 확인해주세요.', undefined);
    } else {
      const print = `${body.current.weather_descriptions}. It is currently ${body.current.temperature} Celsius.`;
      callback(undefined, print);
    }
  });
};

module.exports = forecast;
