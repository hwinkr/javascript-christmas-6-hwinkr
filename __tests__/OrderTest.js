import { BENEFIT_TYPE } from '../src/constants/christmas-event';
import Order from '../src/domains/Order';

describe('주문(Order) 도메인 테스트', () => {
  test.each([
    ['해산물파스타-1,제로콜라-a'],
    ['마라탕-1,제로콜라-1'],
    ['티본스테이크-1,타파스-1,제로콜라-1,티본스테이크-1'],
    ['제로콜라-1, 레드와인-1'],
    ['바비큐립-10,티본스테이크-10,제로콜라-1'],
    ['해산물파스타-1-1'],
  ])('주문 유효성 검증 테스트', (inputs) => {
    // when,then
    expect(() => {
      new Order(inputs);
    }).toThrow('[ERROR]');
  });

  test('할인 전 총주문 금액 계산 테스트', () => {
    // given
    const ORDER = '양송이수프-1,티본스테이크-1,초코케이크-1,제로콜라-1';
    const EXPECTED_AMOUNT = 79_000;
    const order = new Order(ORDER);

    // when
    const orderAmount = order.calculateTotalAmount();

    // then
    expect(orderAmount).toBe(EXPECTED_AMOUNT);
  });

  test.each([
    [['양송이수프-1,제로콜라-2,레드와인-1', BENEFIT_TYPE.weekdayDiscount]],
    [['양송이수프-1,제로콜라-2,레드와인-1', BENEFIT_TYPE.weekendDiscount]],
  ])('에피타이저와 음료는 평일, 주말 할인과 관계없이 할인이 적용 되지 않음을 테스트', (inputs) => {
    // given
    const [orderMenu, discountType] = inputs;
    const order = new Order(orderMenu);
    const EXPECTED_DISCOUNT_AMOUNT = 0;

    // when
    const discountAmount = order.calculateTotalDiscountAmount(discountType);

    // then
    expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
  });

  test.each([['티본스테이크-1,시저샐러드-1,샴페인-1'], ['바비큐립-1,타파스-1,샴페인-1']])(
    '평일에는 메인 메뉴 할인이 적용되지 않음을 테스트',
    (inputs) => {
      // given
      const order = new Order(inputs);
      const EXPECTED_DISCOUNT_AMOUNT = 0;

      // when
      const discountAmount = order.calculateTotalDiscountAmount(BENEFIT_TYPE.weekdayDiscount);

      // then
      expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
    },
  );

  test.each([
    [['양송이수프-1,티본스테이크-1,초코케이크-2', 4_046]],
    [['시저샐러드-1,바비큐립-1,아이스크림-3', 6_069]],
  ])('평일에는 디저트 메뉴 할인이 적용됨을 테스트', (inputs) => {
    // given
    const [orderMenu, expectedDiscountAmount] = inputs;
    const order = new Order(orderMenu);

    // when
    const discountAmount = order.calculateTotalDiscountAmount(BENEFIT_TYPE.weekdayDiscount);

    // then
    expect(discountAmount).toBe(expectedDiscountAmount);
  });

  test.each([['시저샐러드-1,초코케이크-2,샴페인-1'], ['양송이수프-1,아이스크림-3,제로콜라-3']])(
    '주말에는 디저트 메뉴 할인이 적용되지 않음을 테스트',
    (inputs) => {
      // given
      const order = new Order(inputs);
      const EXPECTED_DISCOUNT_AMOUNT = 0;

      // when
      const discountAmount = order.calculateTotalDiscountAmount(BENEFIT_TYPE.weekendDiscount);

      // then
      expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
    },
  );

  test.each([
    [['양송이수프-1,티본스테이크-1,초코케이크-2', 2_023]],
    [['시저샐러드-1,바비큐립-2,아이스크림-3', 4_046]],
  ])('주말에는 메인 메뉴 할인이 적용됨을 테스트', (inputs) => {
    // given
    const [orderMenu, expectedDiscountAmount] = inputs;
    const order = new Order(orderMenu);

    // when
    const discountAmount = order.calculateTotalDiscountAmount(BENEFIT_TYPE.weekendDiscount);

    // then
    expect(discountAmount).toBe(expectedDiscountAmount);
  });

  test('주문 정보 불변성 테스트', () => {
    // given
    const ORDER = '양송이수프-1,티본스테이크-1,초코케이크-1,제로콜라-1';
    const order = new Order(ORDER);
    const orderInfo = order.getInfo();

    // when,then
    expect(() => {
      orderInfo[0].name = '해산물파스타';
    }).toThrow(TypeError);
  });
});
