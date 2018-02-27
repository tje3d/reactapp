import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { Provider }    from 'react-redux';
import storeContainer  from 'reducers';
import { PersistGate } from 'redux-persist/integration/react';

import 'bootstrap3/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import App from 'components/App';

let reducer = storeContainer();

ReactDOM.render(
    <Provider store={reducer.store}>
        <PersistGate loading={null} persistor={reducer.persistor}>
            <App />
        </PersistGate>
    </Provider>,
  document.getElementById('root') as HTMLElement
);