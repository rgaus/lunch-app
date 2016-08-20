export default function fields(state={}, action) {
  switch (action.type) {
    case 'CHOICE_RESPONSE':
      return action.response;
    default:
      return state;
  }
}
