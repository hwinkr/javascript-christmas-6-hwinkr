import { BENEFIT_TYPE } from '../src/constants/christmas-event';
import Menu from '../src/domains/Menu';

describe('메뉴(Menu) 도메인 테스트', () => {
  test('메뉴 정보 불변성 테스트', () => {
    // given
    const menu = new Menu('티본스테이크', 1);
    const menuInfo = menu.getMenuInfo();

    // when,then
    expect(() => {
      menuInfo.quantity = 10;
    }).toThrow(TypeError);
  });

  test.each([
    [['티본스테이크', 2, 110_000]],
    [['초코케이크', 3, 45_000]],
    [['샴페인', 4, 100_000]],
    [['타파스', 5, 27_500]],
  ])('메뉴 금액 계산 테스트', (inputs) => {
    // given
    const [menuName, quantity, expectedAmount] = inputs;
    const menu = new Menu(menuName, quantity);

    // when
    const amount = menu.calculateMenuAmount();

    // then
    expect(amount).toBe(expectedAmount);
  });

  test.each([
    [['양송이수프', 3, BENEFIT_TYPE.weekdayDiscount]],
    [['양송이수프', 3, BENEFIT_TYPE.weekendDiscount]],
    [['샴페인', 2, BENEFIT_TYPE.weekdayDiscount]],
    [['샴페인', 2, BENEFIT_TYPE.weekendDiscount]],
  ])('에피타이저와 음료는 평일, 주말 할인과 관계없이 할인이 적용되지 않음을 테스트', (inputs) => {
    // given
    const [menuName, quantity, discountType] = inputs;
    const menu = new Menu(menuName, quantity);
    const EXPECTED_DISCOUNT_AMOUNT = 0;

    // when
    const discountAmount = menu.calculateDiscountAmount(discountType);

    // then
    expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
  });

  test.each([[['해산물파스타', 3]], [['크리스마스파스타', 2]]])(
    '평일에는 메인 메뉴 할인이 적용되지 않음을 테스트',
    (inputs) => {
      // given
      const [menuName, quantity] = inputs;
      const menu = new Menu(menuName, quantity);
      const EXPECTED_DISCOUNT_AMOUNT = 0;

      // when
      const discountAmount = menu.calculateDiscountAmount(BENEFIT_TYPE.weekdayDiscount);

      // then
      expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
    },
  );

  test.each([[['초코케이크', 3, 6_069]], [['아이스크림', 2, 4_046]]])(
    '평일에는 디저트 메뉴 할인이 적용됨을 테스트',
    (inputs) => {
      // given
      const [menuName, quantity, expectedDiscountAmount] = inputs;
      const menu = new Menu(menuName, quantity);

      // when
      const discountAmount = menu.calculateDiscountAmount(BENEFIT_TYPE.weekdayDiscount);

      // then
      expect(discountAmount).toBe(expectedDiscountAmount);
    },
  );

  test.each([[['초코케이크', 1]], [['아이스크림', 2]]])(
    '주말에는 디저트 메뉴 할인이 적용되지 않음을 테스트',
    (inputs) => {
      // given
      const [menuName, quantity] = inputs;
      const menu = new Menu(menuName, quantity);
      const EXPECTED_DISCOUNT_AMOUNT = 0;

      // when
      const discountAmount = menu.calculateDiscountAmount(BENEFIT_TYPE.weekendDiscount);

      // then
      expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
    },
  );

  test.each([[['해산물파스타', 1, 2_023]], [['크리스마스파스타', 2, 4_046]]])(
    '주말에는 메인 메뉴 할인이 적용됨을 테스트',
    (inputs) => {
      // given
      const [menuName, quantity, expectedDiscountAmount] = inputs;
      const menu = new Menu(menuName, quantity);

      // when
      const discountAmount = menu.calculateDiscountAmount(BENEFIT_TYPE.weekendDiscount);

      // then
      expect(discountAmount).toBe(expectedDiscountAmount);
    },
  );
});
