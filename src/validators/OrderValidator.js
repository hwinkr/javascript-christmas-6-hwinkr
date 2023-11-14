import {
  ERROR_MESSAGES,
  EVENT_RULES,
  MENU_LIST,
  MENU_TYPE,
  SEPERATORS,
} from '../constants/christmas-event.js';

export default class OrderValidator {
  static #getMenuNameList(order) {
    return order.split(SEPERATORS.order).map((item) => item.split(SEPERATORS.menu)[0].trim());
  }

  static #getMenuQuantityList(order) {
    return order
      .split(SEPERATORS.order)
      .map((item) => Number(item.split(SEPERATORS.menu)[1].trim()));
  }

  static #calculateOrderQuantity(order) {
    const MenuQuantityList = OrderValidator.#getMenuQuantityList(order);
    return MenuQuantityList.reduce(
      (accQuantity, currentQuantity) => accQuantity + currentQuantity,
      0,
    );
  }

  static #findMenu(menuName) {
    return MENU_LIST.find((menu) => menu.name === menuName);
  }

  static #isBeverageType(menuName) {
    const menu = OrderValidator.#findMenu(menuName);
    return menu.type === MENU_TYPE.beverage;
  }

  static #isValidOrderformat(order) {
    const regex = EVENT_RULES.validOrderFormat;
    return regex.test(order);
  }

  static #validateOrderformat(order) {
    if (!OrderValidator.#isValidOrderformat(order)) {
      throw new Error(ERROR_MESSAGES.invalidOrder);
    }
  }

  static #validateMenuExistence(order) {
    const menuNameList = OrderValidator.#getMenuNameList(order);
    if (!menuNameList.every((menuName) => !!OrderValidator.#findMenu(menuName))) {
      throw new Error(ERROR_MESSAGES.invalidOrder);
    }
  }

  static #validateMenuUniquness(order) {
    const menuNameList = OrderValidator.#getMenuNameList(order);
    if (menuNameList.length !== new Set(menuNameList).size) {
      throw new Error(ERROR_MESSAGES.invalidOrder);
    }
  }

  static #validateOnlyBeverageOrder(order) {
    const menuNameList = OrderValidator.#getMenuNameList(order);
    if (menuNameList.every((menuName) => this.#isBeverageType(menuName))) {
      throw new Error(ERROR_MESSAGES.onlyBeverageOrder);
    }
  }

  static #validateTotalOrderQuantity(order) {
    const totalOrderQuantity = OrderValidator.#calculateOrderQuantity(order);
    if (totalOrderQuantity > EVENT_RULES.maxOrderQuantity) {
      throw new Error(ERROR_MESSAGES.invalidOrder);
    }
  }

  static validate(order) {
    OrderValidator.#validateOrderformat(order);
    OrderValidator.#validateMenuExistence(order);
    OrderValidator.#validateMenuUniquness(order);
    OrderValidator.#validateOnlyBeverageOrder(order);
    OrderValidator.#validateTotalOrderQuantity(order);
  }
}
