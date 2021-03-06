import {createReducer} from '@reduxjs/toolkit';
import {CURRENT_SORTING, DEFAULT_CITY, DEFAULT_LOCATION} from '../../constants';
import {getCityLocation, getSorting, changeFavorites, changeCurrentOffer, changeNearbyOffers, changeFavoriteOffer} from '../../util';
import {
  changeCity, changeOption, loadOffers, loadDetailOffer,
  loadComments, loadFavorites, loadNearby, addedComment, changeStatus, setError, removeDetailOffer,
} from '../action';

const initialState = {
  currentCity: DEFAULT_CITY,
  currentLocation: DEFAULT_LOCATION,
  currentOption: CURRENT_SORTING,
  offers: [],
  currentOffers: [],
  nearbyOffers: [],
  comments: [],
  favorites: [],
  offerDetails: null,
  error: null,
  isDataLoaded: false,
  isFavoritesLoaded: false
};

const offerData = createReducer(initialState, (builder) => {

  builder.addCase(setError, (state, action) => {
    state.error = action.payload;
  });

  builder.addCase(changeCity, (state, action) => {
    state.currentCity = action.payload;
    state.currentOffers = getSorting(state.offers, action.payload);
    state.currentLocation = getCityLocation(state.offers, action.payload);
    state.currentOption = CURRENT_SORTING;
  });

  builder.addCase(changeStatus, (state, action) => {
    state.offers = changeFavoriteOffer(state.offers, action.payload);
    state.currentOffers = getSorting(state.offers, state.currentCity, state.currentOption);
    state.favorites = changeFavorites(state.favorites, action.payload);
    state.nearbyOffers = changeNearbyOffers(state.nearbyOffers, action.payload);
    state.offerDetails = changeCurrentOffer(state.offerDetails, action.payload);
  });

  builder.addCase(changeOption, (state, action) => {
    state.currentOption = action.payload;
    state.currentOffers = getSorting(state.offers, state.currentCity, action.payload);
  });

  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
    state.currentOffers = getSorting(action.payload, state.currentCity, state.currentOption);
    state.currentLocation = getCityLocation(action.payload, state.currentCity);
    state.isDataLoaded = true;
  });

  builder.addCase(loadDetailOffer, (state, action) => {
    state.offerDetails = action.payload;
  });

  builder.addCase(loadComments, (state, action) => {
    state.comments = action.payload;
  });

  builder.addCase(loadNearby, (state, action) => {
    state.nearbyOffers = action.payload;
  });

  builder.addCase(addedComment, (state, action) => {
    state.comments = action.payload;
    state.error = null;
  });

  builder.addCase(loadFavorites, (state, action) => {
    state.favorites = action.payload;
    state.isFavoritesLoaded = true;
  });

  builder.addCase(removeDetailOffer, (state, action) => {
    state.offerDetails = action.payload;
  });
});

export {
  offerData
};
