import Bedge from '../domains/Bedge.js';
import Gift from '../domains/Gift.js';
import DiscountService from './DiscountService.js';
import deepFreeze from '../utils/deepFreeze.js';

export default class EventPlanner {
  #discountService;

  #gift;

  constructor() {
    this.#discountService = new DiscountService();
    this.#gift = new Gift();
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
    const gift = this.#gift.getGift(orderAmount);
    return deepFreeze(gift);
  }

  getBenefits() {
    const discountInfo = this.#discountService.getDicsountInfo();
    const giftEventInfo = this.#gift.getGiftEventInfo();
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

  getBedge() {
    const orderDiscountAmount = this.#discountService.getTotalDiscountAmount();
    const giftAmount = this.#gift.getGiftAmount();
    const totalBenefitAmount = orderDiscountAmount + giftAmount;
    const bedge = Bedge.getBedge(totalBenefitAmount);

    return bedge;
  }
}
