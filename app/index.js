const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

function countryCodeToFlagEmoji(countryCode) {
  if (countryCode?.length) {
    return countryCode.toUpperCase().replace(/./g, char =>
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );
  }
}

app.get('/', async (req, res) => {
  const clientAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const fetchGeo = async (ip) => {
    try {
      const response = await axios.get(`http://geoip:8080/${ip}`);
      return response.data
    } catch(err) {
      console.error(err)
      return {}
    }
  };

  const clientGeo = await fetchGeo(clientAddr);
  res.render('index', {
    clientAddr,
    clientGeo,
    flag: countryCodeToFlagEmoji(clientGeo.country)
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
