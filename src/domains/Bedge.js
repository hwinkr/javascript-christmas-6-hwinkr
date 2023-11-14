import { BEDGES, BEDGES_THRESHOLDS } from '../constants/christmas-event.js';

export default class Bedge {
  static #isEligibleStarBedge(benefitAmount) {
    return benefitAmount >= BEDGES_THRESHOLDS.star && benefitAmount < BEDGES_THRESHOLDS.tree;
  }

  static #isEligibleTreeBedge(benefitAmount) {
    return benefitAmount >= BEDGES_THRESHOLDS.tree && benefitAmount < BEDGES_THRESHOLDS.santa;
  }

  static #isEligibleSantaBedge(benefitAmount) {
    return benefitAmount >= BEDGES_THRESHOLDS.santa;
  }

  static getBedge(benefitAmount) {
    if (Bedge.#isEligibleStarBedge(benefitAmount)) return BEDGES.star;
    if (Bedge.#isEligibleTreeBedge(benefitAmount)) return BEDGES.tree;
    if (Bedge.#isEligibleSantaBedge(benefitAmount)) return BEDGES.santa;
    return BEDGES.nothing;
  }
}
