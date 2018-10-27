import axios from 'axios';
const base64 = require('base-64');

const Spotify = {};

Spotify.getTopTracks = (access_token, type = 'tracks', limit = 15, time_range = 'medium_term') => {
  //time ranges = long (all time), medium (last ~6 months), short (last 4 weeks)
  return new Promise((resolve, reject) => {
    axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
      params: {
        time_range,
        limit,
        offset: 0
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    })
      .then(response => resolve(response.data) /*Return the requested data*/)
      .catch(err => reject(err));
  });
};

export default Spotify;
