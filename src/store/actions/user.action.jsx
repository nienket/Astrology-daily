import axios from "axios";
// import { NotificationManager } from "react-notifications";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SELF_FAILED,
  SELF_SUCCESS,
  WEATHER_SUCCESS,
  QUOTE_SUCCESS,
  SELF_PLANET_SUCCESS,
  SELF_ZODIAC_SUCCESS,
  SELF_HOUSE_SUCCESS,
  GET_ASTRO_PROFILE_SUCCESS,
  SELF_ASTRO_PROFILE_SUCCESS,
  SELF_ASTRO_PROFILE_PLANET_SUCCESS,
  SELF_ASTRO_PROFILE_ZODIAC_SUCCESS,
  SELF_ASTRO_PROFILE_HOUSE_SUCCESS,
  POST_ASTRO_PROFILE_SUCCESS,
} from "./../constants/user.const";

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = process.env.REACT_APP_API_URL;

export const postUser = (idToken) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${API_URL}/User/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { idToken },
    })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
      })
      .catch((err) => {
        dispatch(postLoginFailed(err));
      });
  };
};

export const postLoginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const postLoginFailed = (err) => {
  return {
    type: LOGIN_FAILED,
    payload: err,
  };
};

export const getSelf = (formData, setFormData, setPlace, setText) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${API_URL}/Horoscope?name=${formData.name}&date=${formData.date}&time=${formData.place_id}&place_id=${formData.place_id}`,
    })
      .then((res) => {
        for (let i = 0; i < 2; i++) {
          axios({
            method: "GET",
            url: `${API_URL}/Explanation/byid?zodiacId=${res.data.planets[i].signId}&houseId=${res.data.planets[i].housePosition}&planetId=${res.data.planets[i].planetId}`,
          })
            .then((res) => {
              dispatch(getSelfPlanetSuccess(res.data));
            })
            .catch((err) => {
              console.log(err);
            });
        }
        dispatch(getSelfSuccess(res.data));
        setFormData({
          name: "",
          date: "",
          time: "",
          place_id: 0,
        });
        setPlace(null);
        setText("");
      })
      .catch((err) => {
        dispatch(getSelfFailed(err));
      });
  };
};

export const getSelfSuccess = (self) => {
  return {
    type: SELF_SUCCESS,
    payload: self,
  };
};
export const getSelfPlanetSuccess = (selfPlanet) => {
  return {
    type: SELF_PLANET_SUCCESS,
    payload: selfPlanet,
  };
};
export const getSelfZodiacSuccess = (selfZodiac) => {
  return {
    type: SELF_ZODIAC_SUCCESS,
    payload: selfZodiac,
  };
};
export const getSelfHouseSuccess = (selfHouse) => {
  return {
    type: SELF_HOUSE_SUCCESS,
    payload: selfHouse,
  };
};


const getSelfFailed = (err) => {
  return {
    type: SELF_FAILED,
    payload: err,
  };
};
export const getPlanet = (name) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${API_URL}/Planet/${name}}`,
    })
      .then((res) => {
        dispatch(getPlanetSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getPlanetSuccess = (self) => {
  return {
    type: SELF_SUCCESS,
    payload: self,
  };
};
export const getQuote = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${API_URL}/Quote`,
    })
      .then((res) => {
        dispatch(getQuoteSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getQuoteSuccess = (quote) => {
  return {
    type: QUOTE_SUCCESS,
    payload: quote,
  };
};
export const getWeather = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "https://astrodaily.monoinfinity.net/WeatherForecast",
    })
      .then((res) => {
        dispatch(getWeatherSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getWeatherSuccess = (weather) => {
  return {
    type: WEATHER_SUCCESS,
    payload: weather,
  };
};

export const getAstroProfile = (user) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${API_URL}/AstroProfile/${user.userUsername}`,
    })
      .then((res) => {
        dispatch(getAstroProfileSuccess(res.data.$values[0]));
        for (let i = 0; i < 2; i++) {
          axios({
            method: "GET",
            url: `${API_URL}/Explanation/byid?zodiacId=${res.data.$values[0].ZodiacPoints.$values[i].Id}&houseId=${res.data.$values[0].Housecusps.$values[i].Id}&planetId=${res.data.$values[0].Elements.$values[i].Id}`,
          })
            .then((res) => {
              dispatch(getSelfAstroProfileZodiacSuccess(res.data));
            })
            .catch((err) => {
              console.log(err);
            });
        }

      })
      .catch((err) => {
        console.error(err);
      });
  };
};
export const getAstroProfileSuccess = (astroProfile) => {
  return {
    type: GET_ASTRO_PROFILE_SUCCESS,
    payload: astroProfile,
  };
};

export const getSelfAstroProfile = (formData, setFormData, setPlace, setText) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${API_URL}/Horoscope?name=${formData.name}&date=${formData.date}&time=${formData.place_id}&place_id=${formData.place_id}`,
    })
      .then((res) => {
        for (let i = 0; i < 2; i++) {
          axios({
            method: "GET",
            url: `${API_URL}/Explanation/byid?zodiacId=${res.data.planets[i].signId}&houseId=${res.data.planets[i].housePosition}&planetId=${res.data.planets[i].planetId}`,
          })
            .then((res) => {
              dispatch(getSelfAstroProfilePlanetSuccess(res.data));
            })
            .catch((err) => {
              console.log(err);
            });
        }
        for (let i = 0; i < 1; i++) {
          axios({
            method: "GET",
            url: "https://astrodaily.monoinfinity.net/WeatherForecast",
          })
            .then((res) => {
              dispatch(getPostSelfAstroProfileSuccess());
            })
            .catch((err) => {
              console.log(err);
            });
        }
        dispatch(getSelfAstroProfileSuccess(res.data));
        setFormData({
          name: "",
          date: "",
          time: "",
          place_id: 0,
        });
        setPlace(null);
        setText("");
      })
      .catch((err) => {
        dispatch(getSelfAstroProfileFailed(err));
      });
  };
};

export const getSelfAstroProfileSuccess = (self) => {
  return {
    type: SELF_ASTRO_PROFILE_SUCCESS,
    payload: self,
  };
};
export const getSelfAstroProfilePlanetSuccess = (selfPlanet) => {
  return {
    type: SELF_ASTRO_PROFILE_PLANET_SUCCESS,
    payload: selfPlanet,
  };
};
export const getSelfAstroProfileZodiacSuccess = (selfZodiac) => {
  return {
    type: SELF_ASTRO_PROFILE_ZODIAC_SUCCESS,
    payload: selfZodiac,
  };
};
export const getSelfAstroProfileHouseSuccess = (selfHouse) => {
  return {
    type: SELF_ASTRO_PROFILE_HOUSE_SUCCESS,
    payload: selfHouse,
  };
};
const getSelfAstroProfileFailed = (err) => {
  return {
    type: SELF_FAILED,
    payload: err,
  };
};
export const getPostSelfAstroProfileSuccess = () => {
  return {
    type: POST_ASTRO_PROFILE_SUCCESS,
  };
};