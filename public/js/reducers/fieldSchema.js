export default function fieldSchema(state={}, action) {
  switch (action.type) {
    case 'FETCH_FIELDS':
      return action.fields;
    default:
      return state;
  }
}
