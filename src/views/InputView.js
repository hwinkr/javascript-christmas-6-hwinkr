import { Console } from '@woowacourse/mission-utils';
import { INPUT_QUERYS } from '../constants/christmas-event.js';

const InputView = {
  async readInput(query) {
    const input = await Console.readLineAsync(query);
    return input;
  },

  async readVisitDate() {
    const visitDate = InputView.readInput(INPUT_QUERYS.visitDate);
    return visitDate;
  },

  async readOrder() {
    const order = InputView.readInput(INPUT_QUERYS.order);
    return order;
  },
};

export default InputView;
