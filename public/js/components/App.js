import React from 'react'
import {connect} from 'react-redux';

export function App({fields}) {
  return <div className="container">
    Hello World.
  </div>
};

export default connect((state, props) => {
  return {
    handle: state.handle,
    fieldValues: state.fields,
    fieldTemplates: state.fieldTemplates,
  };
}, dispatch => {
  return {};
})(App);
