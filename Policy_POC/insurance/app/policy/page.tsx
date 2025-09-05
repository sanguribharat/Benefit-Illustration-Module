"use client";

import React, { useState } from "react";
import axios from "axios";
import InsuranceFormFields, {
  InsuranceFormData,
} from "@/components/InsuranceFormFields";
import InsuranceOutput from "@/components/InsuranceOutput";
import { InsuranceYear } from "@/utils/types";

type InsuranceResponse = {
  projection: InsuranceYear;
  irr: number;
};

const InsuranceForm: React.FC = () => {
  const BASE_URL = "http://127.0.0.1:8000";
  const [data, setData] = useState<InsuranceResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);

  const onSubmit = async (formData: InsuranceFormData) => {
    console.log("Validated Data:", JSON.stringify(formData, null, 2));

    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/api/policy`, formData);
      setData(res.data);
      setIsData(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading ...</div>;
  }

  return (
    <div className="bg-white p-6">
      {!isData? (
        <InsuranceFormFields onSubmit={onSubmit} />
      ) : (
        <InsuranceOutput data={data?.projection || []} irr={data?.irr || 0} />
      )}
    </div>
  );
};

export default InsuranceForm;
