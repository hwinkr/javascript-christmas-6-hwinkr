import { Console } from '@woowacourse/mission-utils';
import {
  BENEFIT_MESSAGES,
  DISCOUNT_AMOUNT,
  EVENT_MESSAGES,
  GIFT,
} from '../constants/christmas-event.js';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printAmount(amountType, price) {
    this.printMessage(`\n${amountType}`);
    this.printMessage(`${price.toLocaleString()}원`);
  },

  printMenuWithQuantity(menu) {
    this.printMessage(`${menu.name}-${menu.quantity}개`);
  },

  printOrderInfo(order) {
    this.printMessage(`\n${EVENT_MESSAGES.orderMenu}`);
    order.forEach((menu) => {
      this.printMenuWithQuantity(menu);
    });
  },

  printGift(gift) {
    this.printMessage(`\n${EVENT_MESSAGES.giftMenu}`);
    if (gift.quantity === GIFT.quantity(false)) {
      this.printMessage(EVENT_MESSAGES.nothing);
      return;
    }
    this.printMenuWithQuantity(gift);
  },

  calculateTotalBenefitAmount(benefits) {
    const totalBenefitAmount = Object.values(benefits).reduce(
      (accAmount, currentAmount) => accAmount + currentAmount,
      0,
    );
    return totalBenefitAmount;
  },

  printBenefits(benefits) {
    this.printMessage(`\n${EVENT_MESSAGES.benefits}`);
    const totalBenefitAmount = this.calculateTotalBenefitAmount(benefits);
    if (totalBenefitAmount === DISCOUNT_AMOUNT.zero) {
      this.printMessage(EVENT_MESSAGES.nothing);
      this.printMessage(EVENT_MESSAGES.belowMinimumOrder);
      return;
    }

    const benefitTypes = Object.keys(benefits);
    benefitTypes.forEach((type) => {
      if (!this.isZeroAmount(benefits[type])) {
        this.printMessage(`${BENEFIT_MESSAGES[type]} : -${benefits[type].toLocaleString()}원`);
      }
    });
  },

  isZeroAmount(amount) {
    return amount === DISCOUNT_AMOUNT.zero;
  },

  printTotalBenefitAmount(totalBenefitAmount) {
    this.printMessage(`\n${EVENT_MESSAGES.totalBenefitAmount}`);
    const sign = this.isZeroAmount(totalBenefitAmount) ? '' : '-';
    this.printMessage(`${sign}${totalBenefitAmount.toLocaleString()}원`);
  },

  printBadge(badge) {
    this.printMessage(`\n${EVENT_MESSAGES.eventBadge}`);
    this.printMessage(badge);
  },
};

export default OutputView;
