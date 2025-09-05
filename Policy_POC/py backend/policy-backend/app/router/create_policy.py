from fastapi import APIRouter, HTTPException
from app.models.policy_details import PolicyDetails
from app.services import create_excel

router = APIRouter()

@router.post("/policy")
def create_policy(request: PolicyDetails):
    try:
        result = create_excel.calculate_policy_projection(
            input_modal_premium=request.modalPremium,
            input_sum_assured=request.sumAssured,
            input_PT=request.pt,
            input_PPT=request.ppt
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
