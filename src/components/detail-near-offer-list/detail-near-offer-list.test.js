import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import DetailNearOfferList from './detail-near-offer-list';
import {Offers} from '../../mocks/mocks';
import {AuthorizationStatus, Path} from '../../constants';

const mockStore = configureStore({});
window.scrollTo = jest.fn();

it(`DetailNearOfferList should render correctly`, () => {
  const store = mockStore({
    PROCESS: {activeCardId: 1},
    USER: {authorizationStatus: AuthorizationStatus.AUTH}
  });
  const history = createMemoryHistory();
  history.push(Path.OFFER);

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <DetailNearOfferList offer={Offers}/>
        </Router>
      </redux.Provider>
  );

  expect(screen.getByText(`Other places in the neighbourhood`)).toBeInTheDocument();
});
