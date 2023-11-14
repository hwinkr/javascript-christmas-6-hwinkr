import { BENEFIT_TYPE, GIFT } from '../constants/christmas-event.js';
import deepFreeze from '../utils/deepFreeze.js';

export default class Gift {
  #giftInfo;

  constructor(orderAmount) {
    this.#giftInfo = this.#setGiftInfo(orderAmount);
  }

  #isEligibleGetGift(orderAmount) {
    return orderAmount >= GIFT.threshold;
  }

  #setGiftInfo(orderAmount) {
    const { name } = GIFT;
    const eligibleGetGift = this.#isEligibleGetGift(orderAmount);
    const quantity = GIFT.quantity(eligibleGetGift);
    const giftInfo = { name, quantity };

    return giftInfo;
  }

  getGiftAmount() {
    return this.#giftInfo.quantity * GIFT.price;
  }

  getInfo() {
    return deepFreeze(this.#giftInfo);
  }

  getEventInfo() {
    const giftAmount = this.getGiftAmount();
    const giftEventInfo = { [BENEFIT_TYPE.giftEvent]: giftAmount };
    return deepFreeze(giftEventInfo);
  }
}
