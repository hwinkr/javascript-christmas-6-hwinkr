import { ERROR_MESSAGE_PREFIX } from '../constants/christmas-event.js';

export default class InvalidOrderException extends Error {
  constructor(error) {
    super(`${ERROR_MESSAGE_PREFIX} ${error}`);
  }
}
