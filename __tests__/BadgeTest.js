import { BADGES } from '../src/constants/christmas-event';
import Badge from '../src/domains/Badge';

describe('12월 이벤트 배지(Bedge) 도메인 테스트', () => {
  test.each([
    [[4_999, BADGES.nothing]],
    [[5_000, BADGES.star]],
    [[9_999, BADGES.star]],
    [[10_000, BADGES.tree]],
    [[19_999, BADGES.tree]],
    [[20_000, BADGES.santa]],
  ])('총 혜택 금액에 따른 12월 이벤트 배지 판단 테스트', (inputs) => {
    // given
    const [benefitAmount, expectedBadge] = inputs;

    // when
    const badge = Badge.getBadge(benefitAmount);

    // then
    expect(badge).toBe(expectedBadge);
  });
});
