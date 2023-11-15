import deepFreeze from '../utils/deepFreeze.js';

export const EVENT_MESSAGES = deepFreeze({
  helloMessage: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  eventPreview: '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  belowMinimumOrder: '(총주문 금액이 10,000원 이하일 경우 이벤트가 적용되지 않습니다.)',
  orderMenu: '<주문 메뉴>',
  orderAmountBeforeDiscount: '<할인 전 총주문 금액>',
  giftMenu: '<증정 메뉴>',
  benefits: '<혜택 내역>',
  totalBenefitAmount: '<총혜택 금액>',
  orderAmountAfterDiscount: '<할인 후 예상 결제 금액>',
  eventBadge: '<12월 이벤트 배지>',
  nothing: '없음',
});

export const ERROR_MESSAGES = deepFreeze({
  invalidDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidOrder: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  onlyBeverageOrder: '[ERROR] 음료만 주문할 수 없습니다. 다른 메뉴를 추가해주세요.',
});

export const INPUT_QUERYS = deepFreeze({
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  order:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const MENU_TYPE = deepFreeze({
  appetizer: 'appitizer',
  main: 'main',
  deesert: 'deesert',
  beverage: 'bevearge',
});

export const MENU_LIST = deepFreeze([
  { type: MENU_TYPE.appetizer, name: '양송이수프', price: 6_000 },
  { type: MENU_TYPE.appetizer, name: '타파스', price: 5_500 },
  { type: MENU_TYPE.appetizer, name: '시저샐러드', price: 8_000 },

  { type: MENU_TYPE.main, name: '티본스테이크', price: 55_000 },
  { type: MENU_TYPE.main, name: '바비큐립', price: 54_000 },
  { type: MENU_TYPE.main, name: '해산물파스타', price: 35_000 },
  { type: MENU_TYPE.main, name: '크리스마스파스타', price: 25_000 },

  { type: MENU_TYPE.deesert, name: '초코케이크', price: 15_000 },
  { type: MENU_TYPE.deesert, name: '아이스크림', price: 5_000 },

  { type: MENU_TYPE.beverage, name: '제로콜라', price: 3_000 },
  { type: MENU_TYPE.beverage, name: '레드와인', price: 60_000 },
  { type: MENU_TYPE.beverage, name: '샴페인', price: 25_000 },
]);

export const EVENT_RULES = deepFreeze({
  year: 2023,
  month: 12,
  startDay: 1,
  endDay: 31,
  christmasThreshold: 25,
  maxOrderQuantity: 20,
  minimumOrderForEvent: 10_000,
  validOrderFormat: /^([가-힣\s]*-(0[1-9]|[1-9]\d*)\s*,\s*)*([가-힣\s]*-(0[1-9]|[1-9]\d*))$/,
});

export const BADGES = deepFreeze({
  star: '별',
  tree: '트리',
  santa: '산타',
  nothing: '없음',
});

export const BADGES_THRESHOLDS = deepFreeze({
  star: 5_000,
  tree: 10_000,
  santa: 20_000,
});

export const GIFT = deepFreeze({
  name: '샴페인',
  price: 25_000,
  threshold: 120_000,
  quantity: (eligible) => (eligible ? 1 : 0),
  nothing: '없음',
});

export const SPECIAL_DISCOUNT_DATE = deepFreeze([3, 10, 17, 24, 25, 31]);

export const WEEKEND = deepFreeze({
  friday: 5,
  saturday: 6,
});

export const BENEFIT_TYPE = deepFreeze({
  christmasDiscount: 'christmasDiscount',
  specialDiscount: 'specialDiscount',
  weekdayDiscount: 'weekdayDiscount',
  weekendDiscount: 'weekendDiscount',
  giftEvent: 'giftEvent',
});

export const BENEFIT_MESSAGES = deepFreeze({
  [BENEFIT_TYPE.christmasDiscount]: '크리스마스 디데이 할인',
  [BENEFIT_TYPE.specialDiscount]: '특별 할인',
  [BENEFIT_TYPE.weekdayDiscount]: '평일 할인',
  [BENEFIT_TYPE.weekendDiscount]: '주말 할인',
  [BENEFIT_TYPE.giftEvent]: '증정 이벤트',
});

export const DISCOUNT_AMOUNT = deepFreeze({
  [BENEFIT_TYPE.weekdayDiscount]: 2_023,
  [BENEFIT_TYPE.weekendDiscount]: 2_023,
  [BENEFIT_TYPE.specialDiscount]: 1_000,
  initialChristmasDiscount: 1_000,
  dailyIncreaseAmount: 100,
  zero: 0,
});

export const SEPERATORS = deepFreeze({
  order: ',',
  menu: '-',
});
