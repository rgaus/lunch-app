import {combineReducers} from 'redux';
import fields from 'reducers/fields';
import fieldSchema from 'reducers/fieldSchema';
import choice from 'reducers/choice';
import handle from 'reducers/handle';
import loading from 'reducers/loading';

const pipe = combineReducers({
  handle,
  fieldSchema,
  fields,
  choice,
  loading,
});

export default pipe;
