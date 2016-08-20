export default function handle(state='', action) {
  switch (action.type) {
    case 'CHANGE_HANDLE':
      return action.handle;
    default:
      return '';
  }
}
