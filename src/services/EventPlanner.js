import Gift from '../domains/Gift.js';
import DiscountService from './DiscountService.js';
import deepFreeze from '../utils/deepFreeze.js';
import Badge from '../domains/Badge.js';

export default class EventPlanner {
  #discountService;

  #gift;

  constructor() {
    this.#discountService = new DiscountService();
    this.#gift = null;
  }

  informVisitDate(visitDate) {
    this.#discountService.informVisitDate(visitDate);
  }

  orderMenu(order) {
    this.#discountService.orderMenu(order);
  }

  getOrderInfo() {
    const orderInfo = this.#discountService.getOrderInfo();
    return deepFreeze(orderInfo);
  }

  getOrderAmountBeforeDiscount() {
    const orderAmount = this.#discountService.getOrderAmountBeforeDiscount();
    return orderAmount;
  }

  getGift() {
    const orderAmount = this.#discountService.getOrderAmountBeforeDiscount();
    this.#gift = new Gift(orderAmount);
    return deepFreeze(this.#gift.getInfo());
  }

  getBenefits() {
    const discountInfo = this.#discountService.getDicsountInfo();
    const giftEventInfo = this.#gift.getEventInfo();
    return deepFreeze({ ...discountInfo, ...giftEventInfo });
  }

  getTotalBenefitAmount() {
    const orderDiscountAmount = this.#discountService.getTotalDiscountAmount();
    const giftAmount = this.#gift.getGiftAmount();
    return orderDiscountAmount + giftAmount;
  }

  getOrderAmountAfterDiscount() {
    const orderAmountAfterDiscount = this.#discountService.getOrderAmountAfterDiscount();
    return orderAmountAfterDiscount;
  }

  getBadge() {
    const orderDiscountAmount = this.#discountService.getTotalDiscountAmount();
    const giftAmount = this.#gift.getGiftAmount();
    const totalBenefitAmount = orderDiscountAmount + giftAmount;
    const badge = Badge.getBadge(totalBenefitAmount);

    return badge;
  }
}
