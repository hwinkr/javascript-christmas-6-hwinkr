import {
  BENEFIT_TYPE,
  ERROR_MESSAGES,
  SPECIAL_DISCOUNT_DATE,
} from '../src/constants/christmas-event';
import VisitDate from '../src/domains/VisitDate';

describe('방문 날짜(VisitDate) 도메인 테스트', () => {
  test.each([['a'], [-1], [0], [32]])('날짜 유효성 검증 테스트', (inputs) => {
    const date = inputs;

    expect(() => {
      new VisitDate(date);
    }).toThrow(ERROR_MESSAGES.invalidDate);
  });

  test.each([[[24, 3300]], [[25, 3400]], [[26, 0]]])(
    '크리스마스 디데이 할인 경계값 테스트',
    (inputs) => {
      // given
      const [date, expectedDiscount] = inputs;
      const visitDate = new VisitDate(date);

      // when
      const christmasDiscountAmount = visitDate.getChristmasDiscountAmount();

      // then
      expect(christmasDiscountAmount).toBe(expectedDiscount);
    },
  );

  test('특별 할인 판단 테스트', () => {
    SPECIAL_DISCOUNT_DATE.forEach((date) => {
      // given
      const visitDate = new VisitDate(date);
      const expectedDiscount = 1_000;

      // when
      const specialDiscount = visitDate.getSpecialDiscountAmount();

      // then
      expect(specialDiscount).toBe(expectedDiscount);
    });
  });

  test.each([
    [[7, BENEFIT_TYPE.weekdayDiscount]],
    [[8, BENEFIT_TYPE.weekendDiscount]],
    [[9, BENEFIT_TYPE.weekendDiscount]],
    [[10, BENEFIT_TYPE.weekdayDiscount]],
  ])('평일, 주말 할인 경계값 테스트', (inputs) => {
    // give
    const [date, expectedDicountType] = inputs;
    const visitDate = new VisitDate(date);

    // when
    const discountType = visitDate.getWeeklyDiscountType();

    // then
    expect(discountType).toBe(expectedDicountType);
  });
});
