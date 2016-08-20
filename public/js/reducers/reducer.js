import {combineReducers} from 'redux';
import fields from 'reducers/fields';
import fieldSchema from 'reducers/fieldSchema';
import choice from 'reducers/choice';
import handle from 'reducers/handle';

const pipe = combineReducers({
  handle,
  fieldSchema,
  fields,
  choice,
});

export default pipe;
