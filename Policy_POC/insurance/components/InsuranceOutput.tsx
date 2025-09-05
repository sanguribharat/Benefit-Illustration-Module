import React from "react";
import { InsuranceYear } from "@/utils/types";

interface InsuranceTableProps {
  data: InsuranceYear[];
  irr : number }

const InsuranceTable: React.FC<InsuranceTableProps> = ({ data, irr }) => {
  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-green-700">
        Insurance Projection Table {irr * 100} % IRR
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Year</th>
              <th className="p-3 border">Premium</th>
              <th className="p-3 border">Sum Assured</th>
              <th className="p-3 border">Bonus Rate</th>
              <th className="p-3 border">Bonus Amount</th>
              <th className="p-3 border">Total Benefit</th>
              <th className="p-3 border">Net Cashflow</th>
            </tr>
          </thead>
          <tbody>
            {data.map((plan) => (
              <tr
                key={plan.year}
                className="odd:bg-white even:bg-gray-50 text-center"
              >
                <td className="p-3 border font-medium">{plan.year}</td>
                <td className="p-3 border">₹{plan.premium.toLocaleString()}</td>
                <td className="p-3 border">
                  ₹{plan.sumAssured.toLocaleString()}
                </td>
                <td className="p-3 border">
                  {(plan.bonusRate).toFixed(2)}%
                </td>
                <td className="p-3 border">
                  ₹{plan.bonusAmount.toLocaleString()}
                </td>
                <td className="p-3 border">
                  ₹{plan.totalBenefit.toLocaleString()}
                </td>
                <td
                  className={`p-3 border font-semibold ${
                    plan.netCashflow >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{plan.netCashflow.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceTable;
