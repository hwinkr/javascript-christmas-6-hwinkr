import { EVENT_MESSAGES } from '../constants/christmas-event.js';
import EventPlanner from '../services/EventPlanner.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

export default class EventController {
  #eventPlanner;

  constructor() {
    this.#eventPlanner = new EventPlanner();
  }

  #printOrderInfo() {
    const orderInfo = this.#eventPlanner.getOrderInfo();
    OutputView.printOrderInfo(orderInfo);
  }

  #printOrderAmountBeforeDiscount() {
    const orderAmount = this.#eventPlanner.getOrderAmountBeforeDiscount();
    OutputView.printAmount(EVENT_MESSAGES.orderAmountBeforeDiscount, orderAmount);
  }

  #printGift() {
    const gift = this.#eventPlanner.getGift();
    OutputView.printGift(gift);
  }

  #printBenefits() {
    const benefits = this.#eventPlanner.getBenefits();
    OutputView.printBenefits(benefits);
  }

  #printTotalBenefitAmount() {
    const totalBenefitAmount = this.#eventPlanner.getTotalBenefitAmount();
    OutputView.printTotalBenefitAmount(totalBenefitAmount);
  }

  #printOrderAmountAfterDiscount() {
    const orderAmountAfterDiscount = this.#eventPlanner.getOrderAmountAfterDiscount();
    OutputView.printAmount(EVENT_MESSAGES.orderAmountAfterDiscount, orderAmountAfterDiscount);
  }

  #printBadge() {
    const badge = this.#eventPlanner.getBadge();
    OutputView.printBadge(badge);
  }

  async #informVisitDate() {
    try {
      const visitDate = await InputView.readVisitDate();
      this.#eventPlanner.informVisitDate(Number(visitDate));
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#informVisitDate();
    }
  }

  async #orderMenu() {
    try {
      const order = await InputView.readOrder();
      this.#eventPlanner.orderMenu(order);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#orderMenu();
    }
  }

  async run() {
    OutputView.printMessage(EVENT_MESSAGES.helloMessage);
    await this.#informVisitDate();
    await this.#orderMenu();
    OutputView.printMessage(EVENT_MESSAGES.eventPreview);
    this.#printOrderInfo();
    this.#printOrderAmountBeforeDiscount();
    this.#printGift();
    this.#printBenefits();
    this.#printTotalBenefitAmount();
    this.#printOrderAmountAfterDiscount();
    this.#printBadge();
  }
}
