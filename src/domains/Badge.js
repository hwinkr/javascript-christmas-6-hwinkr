import { BADGES, BADGES_THRESHOLDS } from '../constants/christmas-event.js';

export default class Badge {
  static #isEligibleStarBadge(benefitAmount) {
    return benefitAmount >= BADGES_THRESHOLDS.star && benefitAmount < BADGES_THRESHOLDS.tree;
  }

  static #isEligibleTreeBadge(benefitAmount) {
    return benefitAmount >= BADGES_THRESHOLDS.tree && benefitAmount < BADGES_THRESHOLDS.santa;
  }

  static #isEligibleSantaBadge(benefitAmount) {
    return benefitAmount >= BADGES_THRESHOLDS.santa;
  }

  static getBadge(benefitAmount) {
    if (Badge.#isEligibleStarBadge(benefitAmount)) return BADGES.star;
    if (Badge.#isEligibleTreeBadge(benefitAmount)) return BADGES.tree;
    if (Badge.#isEligibleSantaBadge(benefitAmount)) return BADGES.santa;
    return BADGES.nothing;
  }
}
