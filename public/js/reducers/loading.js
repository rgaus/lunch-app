export default function loadingSpinner(state={picks: false, fields: false}, action) {
  switch (action.type) {
    case 'LOADING_FIELDS':
      return Object.assign({}, state, {fields: true});
    case 'FETCH_FIELDS':
      return Object.assign({}, state, {fields: false});
    case 'LOADING_PICK':
      return Object.assign({}, state, {picks: true});
    case 'CHOICE_RESPONSE':
      return Object.assign({}, state, {picks: false});
    default:
      return state;
  }
}
