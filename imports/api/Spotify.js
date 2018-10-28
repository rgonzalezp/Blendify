/* global Promise */
import axios from 'axios';

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

Spotify.createPlaylist = (access_token, user_id, name, description) => {
  return new Promise((resolve, reject) => {
    axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      params: {
        name,
        description,
        public: false,
        collaborative: true
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    })
      .then(response => resolve(response.data) /*Return the requested data*/)
      .catch(err => reject(err));
  });
};

Spotify.addTracks = (access_token, playlist_id, uris) => {
  return new Promise((resolve, reject) => {
    axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      params: {
        uris,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    })
      .then(response => resolve(response.data) /*Return the requested data*/)
      .catch(err => reject(err));
  });
};

export default Spotify;
