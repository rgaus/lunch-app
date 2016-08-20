export default function fields(state={}, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return Object.assign({}, state, {[action.field]: action.value});

    case 'FETCH_FIELDS':
      let fieldTemplates = {};
      action.fields.forEach(field => fieldTemplates[field] = '');
      return Object.assign({}, state, fieldTemplates);

    default:
      return {};
  }
}
