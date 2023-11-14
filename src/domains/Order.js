import { SEPERATORS } from '../constants/christmas-event.js';
import deepFreeze from '../utils/deepFreeze.js';
import OrderValidator from '../validators/OrderValidator.js';
import Menu from './Menu.js';

export default class Order {
  #menuList;

  constructor(order) {
    OrderValidator.validate(order);
    this.#menuList = this.#generateMenuList(order);
  }

  #createOrderForm(order) {
    const orderList = order.split(SEPERATORS.order).map((orderMenu) => orderMenu.trim());
    const orderForm = orderList.reduce((accForm, orderMenu) => {
      const [name, quantity] = orderMenu.split(SEPERATORS.menu).map((item) => item.trim());
      return [...accForm, { name, quantity }];
    }, []);

    return deepFreeze(orderForm);
  }

  #generateMenuList(order) {
    const orderForm = this.#createOrderForm(order);
    const menuList = orderForm.map((menu) => {
      const { name, quantity } = menu;
      return new Menu(name, Number(quantity));
    });
    return menuList;
  }

  calculateTotalAmount() {
    const totalAmount = this.#menuList.reduce(
      (accPrice, menu) => accPrice + menu.calculateMenuAmount(),
      0,
    );
    return totalAmount;
  }

  calculateTotalDiscountAmount(discountType) {
    const totalDiscountAmount = this.#menuList.reduce(
      (accDiscount, menu) => accDiscount + menu.calculateDiscountAmount(discountType),
      0,
    );
    return totalDiscountAmount;
  }

  getInfo() {
    const orderInfo = this.#menuList.reduce(
      (accInfo, menu) => [...accInfo, menu.getMenuInfo()],
      [],
    );

    return deepFreeze(orderInfo);
  }
}
