import { BENEFIT_TYPE, GIFT } from '../constants/christmas-event.js';

export default class Gift {
  #giftInfo;

  constructor() {
    this.#giftInfo = null;
  }

  #isEligibleGetGift(totalOrderPrice) {
    return totalOrderPrice >= GIFT.threshold;
  }

  getGiftAmount() {
    return this.#giftInfo.quantity * GIFT.price;
  }

  getGift(totalOrderPrice) {
    const { name } = GIFT;
    const eligibleGetGift = this.#isEligibleGetGift(totalOrderPrice);
    const quantity = GIFT.quantity(eligibleGetGift);
    this.#giftInfo = { name, quantity };

    return this.#giftInfo;
  }

  getGiftEventInfo() {
    const giftAmount = this.getGiftAmount();
    const giftInfo = { [BENEFIT_TYPE.giftEvent]: giftAmount };
    return giftInfo;
  }
}
