import { BENEFIT_TYPE } from '../src/constants/christmas-event';
import Gift from '../src/domains/Gift';

describe('증정품(Gift) 도메인 테스트', () => {
  test.each([
    [[111_999, { name: '샴페인', quantity: 0 }]],
    [[120_000, { name: '샴페인', quantity: 1 }]],
  ])('증정품 경계값 테스트', (inputs) => {
    // given
    const [orderAmount, expectedGiftInfo] = inputs;
    const gift = new Gift(orderAmount);

    // when
    const giftInfo = gift.getInfo();

    // then
    expect(giftInfo).toEqual(expectedGiftInfo);
  });

  test('증정품 불변성 테스트', () => {
    const ORDER_AMOUNT = 100_000;
    const gift = new Gift(ORDER_AMOUNT);

    const giftInfo = gift.getInfo();

    expect(() => {
      giftInfo.quantity = 10;
    }).toThrow(TypeError);
  });

  test.each([[[111_999, 0]], [[120_000, 25_000]]])('증정품 가격 경계값 테스트', (inputs) => {
    // given
    const [orderAmount, expectedGiftAmount] = inputs;
    const gift = new Gift(orderAmount);

    // when
    const giftAmount = gift.getGiftAmount();

    // then
    expect(giftAmount).toBe(expectedGiftAmount);
  });

  test.each([
    [[111_999, { [BENEFIT_TYPE.giftEvent]: 0 }]],
    [[120_000, { [BENEFIT_TYPE.giftEvent]: 25_000 }]],
  ])('증정 이벤트 정보 경계값 테스트', (inputs) => {
    // given
    const [orderAmount, expectedGiftEventInfo] = inputs;
    const gift = new Gift(orderAmount);

    // when
    const giftEventInfo = gift.getEventInfo();

    // then
    expect(giftEventInfo).toEqual(expectedGiftEventInfo);
  });

  test('증정 이벤트 정보 불변성 테스트', () => {
    const ORDER_AMOUNT = 100_000;
    const gift = new Gift(ORDER_AMOUNT);

    const giftEventInfo = gift.getInfo();

    expect(() => {
      giftEventInfo.giftEvent = 50_000;
    }).toThrow(TypeError);
  });
});
