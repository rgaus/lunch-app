import React from 'react'
import {connect} from 'react-redux';
import Select from 'react-select';

import changeField from 'actions/changeField';
import choiceResponse from 'actions/choiceResponse';
import loadingPick from 'actions/loadingPick';

export function App({handle, fieldValues, fieldSchema, changeField, getChoice, choice, loading}) {
  return <div className="container">
    {loading.fields ? <span className="loading">Loading Fields...</span> : null}
    {Object.keys(fieldValues).map((field, ct) => {
      let options = fieldSchema[field].map(f => {
        return {value: f, label: f.length === 0 ? '(empty)' : f};
      });
      options.unshift({value: '*', label: 'Any Choice'})

      return <div className="form-group" key={ct}>
        <h3>{field}</h3>
        <Select
          value={fieldValues[field]}
          onChange={changeField.bind(null, field)}
          options={options}
        />
      </div>;
    })}

    <button className="btn btn-primary" onClick={getChoice.bind(null, handle, fieldValues)}>
      Go
    </button>

    <hr />
    {loading.picks ? <span className="loading">Loading Pick...</span> : null}
    {choice.venue ? <FinalPick pick={choice} /> : null}
  </div>
};

export function FinalPick({pick}) {
  return <div className="final-pick">
    Pick: {pick.venue}
  </div>;
}

export default connect((state, props) => {
  return {
    handle: state.handle,
    fieldValues: state.fields,
    fieldSchema: state.fieldSchema,
    choice: state.choice,
    loading: state.loading,
  };
}, dispatch => {
  return {
    changeField(field, event) {
      if (event) {
        dispatch(changeField(field, event.value));
      } else {
        dispatch(changeField(field, '*'));
      }
    },
    getChoice(handle, options) {
      dispatch(loadingPick());
      fetch(`/${handle}/pick`, {
        method: 'POST',
        headers: {'content-type': 'appication/json', accept: 'appication/json'},
        body: JSON.stringify(options),
      }).then(resp => resp.json()).then(pick => {
        dispatch(choiceResponse(pick.place));
      });
    }
  };
})(App);
