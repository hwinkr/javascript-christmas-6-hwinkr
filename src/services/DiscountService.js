import { BENEFIT_TYPE, DISCOUNT_AMOUNT, EVENT_RULES } from '../constants/christmas-event.js';
import Order from '../domains/Order.js';
import VisitDate from '../domains/VisitDate.js';

export default class DiscountService {
  #visitDate;

  #order;

  #discountInfo;

  constructor() {
    this.#order = null;
    this.#discountInfo = null;
  }

  #isEligibleApplyEvent() {
    const totalOrderPrice = this.getOrderAmountBeforeDiscount();
    return totalOrderPrice >= EVENT_RULES.minimumOrderForEvent;
  }

  #calculateWeeklyDiscountAmount() {
    const weeklyDiscountType = this.#visitDate.getWeeklyDiscountType();
    const totalWeekyDiscountAmount = this.#isEligibleApplyEvent()
      ? this.#order.calculateTotalDiscountAmount(weeklyDiscountType)
      : DISCOUNT_AMOUNT.zero;

    this.#discountInfo = { ...this.#discountInfo, [weeklyDiscountType]: totalWeekyDiscountAmount };
  }

  #calculateChristmasDiscountAmount() {
    const christmasDiscount = this.#isEligibleApplyEvent()
      ? this.#visitDate.getChristmasDiscountAmount()
      : DISCOUNT_AMOUNT.zero;

    this.#discountInfo = {
      ...this.#discountInfo,
      [BENEFIT_TYPE.christmasDiscount]: christmasDiscount,
    };
  }

  #calculateSpecialDiscountAmount() {
    const specialDiscount = this.#isEligibleApplyEvent()
      ? this.#visitDate.getSpecialDiscountAmount()
      : DISCOUNT_AMOUNT.zero;

    this.#discountInfo = {
      ...this.#discountInfo,
      [BENEFIT_TYPE.specialDiscount]: specialDiscount,
    };
  }

  #updateDiscountInfo() {
    this.#calculateChristmasDiscountAmount();
    this.#calculateWeeklyDiscountAmount();
    this.#calculateSpecialDiscountAmount();
  }

  informVisitDate(visitDate) {
    this.#visitDate = new VisitDate(visitDate);
  }

  orderMenu(order) {
    this.#order = new Order(order);
  }

  getOrderInfo() {
    return this.#order.getInfo();
  }

  getOrderAmountBeforeDiscount() {
    return this.#order.calculateTotalAmount();
  }

  getOrderAmountAfterDiscount() {
    return this.#order.calculateTotalAmount() - this.getTotalDiscountAmount();
  }

  getTotalDiscountAmount() {
    const benefitTypes = Object.keys(this.#discountInfo);
    const totalBenefitAmount = benefitTypes.reduce(
      (accBenefit, type) => accBenefit + this.#discountInfo[type],
      DISCOUNT_AMOUNT.zero,
    );

    return totalBenefitAmount;
  }

  getDicsountInfo() {
    this.#updateDiscountInfo();
    return this.#discountInfo;
  }
}
