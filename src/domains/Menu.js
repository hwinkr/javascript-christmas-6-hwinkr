import {
  BENEFIT_TYPE,
  MENU_TYPE,
  MENU_LIST,
  DISCOUNT_AMOUNT,
} from '../constants/christmas-event.js';
import deepFreeze from '../utils/deepFreeze.js';

export default class Menu {
  #name;

  #quantity;

  constructor(name, quantity) {
    this.#name = name;
    this.#quantity = quantity;
  }

  #findMenu() {
    const menu = MENU_LIST.find((item) => item.name === this.#name);
    return menu;
  }

  #getMenuType() {
    const menu = this.#findMenu();
    return menu.type;
  }

  #getMenuPrice() {
    const menu = this.#findMenu();
    return menu.price;
  }

  #checkDiscountableMenu(menuType) {
    return menuType === MENU_TYPE.main || menuType === MENU_TYPE.deesert;
  }

  #checkDiscountApplicable(menuType, discountType) {
    if (menuType === MENU_TYPE.main && discountType === BENEFIT_TYPE.weekendDiscount) {
      return true;
    }

    if (menuType === MENU_TYPE.deesert && discountType === BENEFIT_TYPE.weekdayDiscount) {
      return true;
    }

    return false;
  }

  #isDiscountable(menuType, discountType) {
    return (
      this.#checkDiscountableMenu(menuType) && this.#checkDiscountApplicable(menuType, discountType)
    );
  }

  calculateDiscountAmount(discountType) {
    const menuType = this.#getMenuType();
    if (!this.#isDiscountable(menuType, discountType)) {
      return 0;
    }

    const discountAmount = DISCOUNT_AMOUNT[discountType] * this.#quantity;
    return discountAmount;
  }

  calculateMenuAmount() {
    const menuPrice = this.#getMenuPrice();
    return menuPrice * this.#quantity;
  }

  getMenuInfo() {
    return deepFreeze({
      name: this.#name,
      quantity: this.#quantity,
    });
  }
}
