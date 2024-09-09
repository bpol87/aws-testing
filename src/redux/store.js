import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeLatest("ADD_PHOTO", addPhoto);
}

function* addPhoto(action) {
  try {
    const photoToAdd = action.payload
    console.log('photoToAdd is:' , photoToAdd)
    const config = {
      headers: {
        "Content-Type": file.type,
      },
    };

    const addedPhoto = yield axios.post("/api/aws", photoToAdd, config);
  } catch {}
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [""], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the specific movie details
const details = (state = [""], action) => {
  if (action.type === "SET_DETAIL") {
    return action.payload;
  }
  return state;
};

// Used to store the movie genres
const profiles = (state = [""], action) => {
  switch (action.type) {
    case "SET_PROFILES":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    profiles
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
