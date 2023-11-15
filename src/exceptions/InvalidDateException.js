import { ERROR_MESSAGE_PREFIX } from '../constants/christmas-event.js';

class InvalidDateException extends Error {
  constructor(error) {
    super(`${ERROR_MESSAGE_PREFIX} ${error}`);
  }
}

export default InvalidDateException;
