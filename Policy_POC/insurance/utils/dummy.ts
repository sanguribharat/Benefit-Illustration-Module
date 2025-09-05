// dummyInsuranceData.ts
import { InsuranceYear } from "@/utils/types";

export const dummyInsuranceData: InsuranceYear[] = [
  {
    year: 1,
    premium: 10000,
    sumAssured: 500000,
    bonusRate: 0.02,
    bonusAmount: 10000,
    totalBenefit: 510000,
    netCashflow: -10000,
  },
  {
    year: 2,
    premium: 10000,
    sumAssured: 500000,
    bonusRate: 0.025,
    bonusAmount: 12500,
    totalBenefit: 512500,
    netCashflow: -10000,
  },
  {
    year: 3,
    premium: 10000,
    sumAssured: 500000,
    bonusRate: 0.03,
    bonusAmount: 15000,
    totalBenefit: 515000,
    netCashflow: -10000,
  },
  {
    year: 10,
    premium: 0,
    sumAssured: 500000,
    bonusRate: 0.04,
    bonusAmount: 20000,
    totalBenefit: 520000,
    netCashflow: 520000, // maturity payout
  },
];
