import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from 'components/App'

import _ from 'lodash'; // to get lodash loaded by webpack
import 'material-design-icons'; // to get lodash loaded by webpack

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
    <MuiThemeProvider>
      <App></App>
    </MuiThemeProvider>,
    document.getElementById('todo-app')
);
