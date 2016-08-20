export default function sendError(error) {
  return {type: 'SEND_ERROR', error};
}
