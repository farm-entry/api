export const NavItemJournalTemplateLookup = {
  MORTALITY: "MORTALITY",
  QTYADJ: "QTYADJ",
  GRADEOFF: "GRADEOFF",
  MOVE: "MOVE",
  WEAN: "WEAN",
  PURCHASE: "PURCHASE",
  SHIPMENT: "SHIPMENT",
  INVENTORY: "INVENTORY",
} as const;

export type NavItemJournalTemplate = keyof typeof NavItemJournalTemplateLookup;

export enum NavEntryType {
  Positive = "Positive Adjmt.",
  Negative = "Negative Adjmt.",
}

export enum NavReasonCode {
  NaturalDeath = "DEAD-NAT",
  Euthanized = "DEAD-EUTH",
  GradeOffLame = "GRLAME",
  GradeOffRespitory = "GRRESP",
  GradeOffBellyRupture = "GRBRUPT",
  GradeOffScrotumRupture = "GRSRUPT",
  GradeOffScours = "GRSCOURS",
  GradeOffSmall = "GRSMALL",
  GradeOffUnthrifty = "GRUNTHRIFT",
}

//TODO - does this need to be here or just on post?
export enum NavItemJournalBatch {
  FarmApp = "FARMAPP",
}
