import {
  BENEFIT_TYPE,
  DISCOUNT_AMOUNT,
  ERROR_MESSAGES,
  EVENT_RULES,
  SPECIAL_DISCOUNT_DATE,
  WEEKEND,
} from '../constants/christmas-event.js';
import InvalidDateException from '../exceptions/InvalidDateException.js';

export default class VisitDate {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  #validateDateType(date) {
    if (typeof date !== 'number' || Number.isNaN(date)) {
      throw new InvalidDateException(ERROR_MESSAGES.invalidDate);
    }
  }

  #validateDateRange(date) {
    if (date < EVENT_RULES.startDay || date > EVENT_RULES.endDay) {
      throw new InvalidDateException(ERROR_MESSAGES.invalidDate);
    }
  }

  #validate(date) {
    this.#validateDateType(date);
    this.#validateDateRange(date);
  }

  #isChristmasDiscountApplicable() {
    return this.#date <= EVENT_RULES.christmasThreshold;
  }

  #isSpecialDiscountApplicable() {
    return SPECIAL_DISCOUNT_DATE.includes(this.#date);
  }

  #isWeekend(day) {
    return day === WEEKEND.friday || day === WEEKEND.saturday;
  }

  getWeeklyDiscountType() {
    const dateObject = new Date(`${EVENT_RULES.year}-${EVENT_RULES.month}-${this.#date}`);
    const day = dateObject.getDay();

    return this.#isWeekend(day) ? BENEFIT_TYPE.weekendDiscount : BENEFIT_TYPE.weekdayDiscount;
  }

  getChristmasDiscountAmount() {
    if (!this.#isChristmasDiscountApplicable()) {
      return DISCOUNT_AMOUNT.zero;
    }

    const discountAmount =
      DISCOUNT_AMOUNT.initialChristmasDiscount +
      DISCOUNT_AMOUNT.dailyIncreaseAmount * (this.#date - EVENT_RULES.startDay);

    return discountAmount;
  }

  getSpecialDiscountAmount() {
    if (!this.#isSpecialDiscountApplicable()) {
      return DISCOUNT_AMOUNT.zero;
    }

    return DISCOUNT_AMOUNT.specialDiscount;
  }
}
