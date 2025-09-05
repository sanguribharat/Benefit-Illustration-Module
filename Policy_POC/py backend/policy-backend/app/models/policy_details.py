from enum import IntEnum
from typing import List, Optional
from pydantic import BaseModel


class Gender(IntEnum):
    M = 1
    F = 2
    O = 3


class PremiumFrequency(IntEnum):
    YEARLY = 1
    HALF_YEARLY = 2
    MONTHLY = 3


class PolicyDetails(BaseModel):
    dob: str
    gender: Gender = Gender.M
    sumAssured: int
    modalPremium: int
    premiumFrequency: PremiumFrequency = PremiumFrequency.YEARLY
    pt: int
    ppt: int

class YearlyProjection(BaseModel):
    year: int
    premium: int
    sumAssured: int
    bonusRate: float
    bonusAmount: float
    totalBenefit: float
    netCashflow: float

class PolicyProjectionResponse(BaseModel):
    projection: List[YearlyProjection]
    irr: Optional[float]