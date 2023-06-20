import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SELF_FAILED,
  WEATHER_SUCCESS,
  QUOTE_SUCCESS,
  SELF_SUCCESS,
  SELF_PLANET_SUCCESS,
  SELF_ZODIAC_SUCCESS,
  SELF_HOUSE_SUCCESS,
  SELF_ASTRO_PROFILE_SUCCESS,
  SELF_ASTRO_PROFILE_PLANET_SUCCESS,
  SELF_ASTRO_PROFILE_ZODIAC_SUCCESS,
  SELF_ASTRO_PROFILE_HOUSE_SUCCESS,
  GET_ASTRO_PROFILE_SUCCESS,
  POST_ASTRO_PROFILE_SUCCESS,
} from "../constants/user.const";

const initialState = {
  user: JSON.parse(localStorage.getItem("userObject"))
    ? JSON.parse(localStorage.getItem("userObject"))
    : null,
  self: null,
  selfAstroProfile: null,
  weather: [],
  quote: [],
  astroProfile: null,
  selfPlanet: [],
  selfPlanetProfile: [],
  selfZodiac: [],
  // selfHouse: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, user: payload };
    }
    case LOGIN_FAILED: {
      return { ...state, errors: payload };
    }
    case GET_ASTRO_PROFILE_SUCCESS: {
      return { ...state, astroProfile: payload };
    }
    case SELF_SUCCESS: {
      return { ...state, self: payload };
    }
    case SELF_PLANET_SUCCESS: {
      return { ...state, selfPlanet:[ ...state.selfPlanet, ...payload] };
    }
    case SELF_ZODIAC_SUCCESS: {
      return { ...state, self: { ...state.self, selfZodiac: payload } };
    }
    case SELF_HOUSE_SUCCESS: {
      return { ...state, self: { ...state.self, selfHouse: payload } };
    }
    case SELF_ASTRO_PROFILE_SUCCESS: {
      return { ...state, selfAstroProfile: payload };
    }
    case SELF_ASTRO_PROFILE_PLANET_SUCCESS: {
      return {
        ...state,
        selfPlanetProfile: [...state.selfPlanetProfile, ...payload],
      };
    }
    case SELF_ASTRO_PROFILE_ZODIAC_SUCCESS: {
      return {
        ...state,
        selfZodiac: [...state.selfZodiac, ...payload],
      };
    }
    case SELF_ASTRO_PROFILE_HOUSE_SUCCESS: {
      return {
        ...state,
        selfAstroProfile: { ...state.selfAstroProfile, selfHouse: payload },
      };
    }
    case POST_ASTRO_PROFILE_SUCCESS: {
      const arr = state.selfAstroProfile.profile.birthdate.date.split(" ");
      state.selfAstroProfile.profile.birthdate.date = arr[0];
      const planets = state.selfAstroProfile.planets.slice(0, 2);
      delete state.selfAstroProfile.elements;
      delete state.selfAstroProfile.zodiacPoints;
      delete state.selfAstroProfile.housecusps;
      delete state.selfAstroProfile.aspects;
      delete state.selfAstroProfile.angles;
      delete state.selfAstroProfile.ascendant;
      delete state.selfAstroProfile.midheaven;
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/AstroProfile?username=${state.user.userUsername}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { ...state.selfAstroProfile, planets },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      return state;
    }
    case SELF_FAILED: {
      return { ...state, errors: payload };
    }
    case QUOTE_SUCCESS: {
      return { ...state, quote: payload };
    }
    case WEATHER_SUCCESS: {
      return { ...state, weather: payload };
    }
    default:
      return state;
  }
};

export default userReducer;
