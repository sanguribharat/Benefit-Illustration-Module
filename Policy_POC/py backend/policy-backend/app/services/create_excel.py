import numpy_financial as npf

def calculate_policy_projection(
    input_modal_premium: int,
    input_sum_assured: int,
    input_PT: int,
    input_PPT: int,
    bonus_rate: tuple[float, ...] = (
        2.5, 3.0, 3.50, 3.5, 3.50,
        3.50, 3.0, 3.0, 3.0, 3.0,
        3.0, 2.50, 3.0, 3.0, 2.50,
        5.0, 4.0, 4.50, 4.0, 25.0
    )
):
    n_years = len(bonus_rate)

    premium = [0] * n_years
    sum_assured = [0] * n_years
    bonus_amount = [0.0] * n_years
    total_benefit = [0.0] * n_years
    net_cashflows = [0.0] * n_years

    for year in range(n_years):
        if (year + 1) <= input_PPT:
            premium[year] = input_modal_premium

    for year in range(n_years):
        if (year + 1) == input_PT:
            sum_assured[year] = input_sum_assured

    for year in range(n_years):
        bonus_amount[year] = (bonus_rate[year] * input_sum_assured) / 100

    for year in range(n_years):
        if (year + 1) == input_PT:
            total_benefit[year] = sum_assured[year] + sum(bonus_amount)
            net_cashflows[year] = total_benefit[year]
        else:
            total_benefit[year] = 0
            net_cashflows[year] = sum_assured[year] - premium[year]

    irr_value = float(npf.irr(net_cashflows)) if any(net_cashflows) else None

    yearly_data = []
    for year in range(n_years):
        yearly_data.append({
            "year": year + 1,
            "premium": premium[year],
            "sumAssured": sum_assured[year],
            "bonusRate": bonus_rate[year],
            "bonusAmount": bonus_amount[year],
            "totalBenefit": total_benefit[year],
            "netCashflow": net_cashflows[year],
        })

    return {
        "projection": yearly_data,
        "irr": irr_value
    }
