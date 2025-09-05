"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Gender,
  PremiumFrequency,
  GenderLabels,
  PremiumFrequencyLabels,
} from "@/utils/types";

export const InsuranceSchema = z
  .object({
    dob: z.string().nonempty("Date of birth is required"),
    gender: z.nativeEnum(Gender),
    sumAssured: z.number().min(500000, "Minimum sum assured is 5,00,000"),
    modalPremium: z
      .number()
      .min(10000, "Premium must be at least 10,000")
      .max(80000, "Premium must be at most 80,000"),
    premiumFrequency: z.nativeEnum(PremiumFrequency),
    pt: z
      .number()
      .min(10, "PT must be at least 10")
      .max(20, "PT must be at most 20"),
    ppt: z
      .number()
      .min(5, "PPT must be at least 5")
      .max(10, "PPT must be at most 10"),
  })
  .refine((data) => data.pt > data.ppt, {
    path: ["pt"],
    message: "PT must be greater than PPT",
  })
  .refine(
    (data) => {
      const dobDate = new Date(data.dob);
      const today = new Date();
      const age =
        today.getFullYear() -
        dobDate.getFullYear() -
        (today <
        new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate())
          ? 1
          : 0);

      return age >= 23 && age <= 56;
    },
    {
      path: ["dob"],
      message: "Age must be between 23 and 56 years",
    }
  );

export type InsuranceFormData = z.infer<typeof InsuranceSchema>;

interface InsuranceFormFieldsProps {
  onSubmit: (data: InsuranceFormData) => void;
}

const InsuranceFormFields: React.FC<InsuranceFormFieldsProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InsuranceFormData>({
    resolver: zodResolver(InsuranceSchema),
    defaultValues: {
      dob: "",
      gender: Gender.Male,
      sumAssured: 0,
      modalPremium: 0,
      premiumFrequency: PremiumFrequency.Yearly,
      pt: 0,
      ppt: 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Insurance Plan Form</h2>

      {/* DOB */}
      <div>
        <label className="block font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          {...register("dob")}
          className="w-full border rounded-lg p-2"
        />
        {errors.dob && (
          <p className="text-red-600 text-sm">{errors.dob.message}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block font-medium mb-1">Gender</label>
        <select
          {...register("gender", { setValueAs: (v) => Number(v) })}
          className="w-full border rounded-lg p-2"
        >
          {Object.values(Gender)
            .filter((v) => typeof v === "number")
            .map((value) => (
              <option key={value} value={value}>
                {GenderLabels[value as Gender]}
              </option>
            ))}
        </select>
        {errors.gender && (
          <p className="text-red-600 text-sm">{errors.gender.message}</p>
        )}
      </div>

      {/* Premium Frequency */}
      <div>
        <label className="block font-medium mb-1">Premium Frequency</label>
        <select
          {...register("premiumFrequency", { setValueAs: (v) => Number(v) })}
          className="w-full border rounded-lg p-2"
        >
          {Object.values(PremiumFrequency)
            .filter((v) => typeof v === "number")
            .map((value) => (
              <option key={value} value={value}>
                {PremiumFrequencyLabels[value as PremiumFrequency]}
              </option>
            ))}
        </select>
        {errors.premiumFrequency && (
          <p className="text-red-600 text-sm">
            {errors.premiumFrequency.message}
          </p>
        )}
      </div>

      {/* Sum Assured */}
      <div>
        <label className="block font-medium mb-1">Sum Assured</label>
        <input
          type="number"
          {...register("sumAssured", { valueAsNumber: true })}
          className="w-full border rounded-lg p-2"
        />
        {errors.sumAssured && (
          <p className="text-red-600 text-sm">{errors.sumAssured.message}</p>
        )}
      </div>

      {/* Modal Premium */}
      <div>
        <label className="block font-medium mb-1">Modal Premium</label>
        <input
          type="number"
          {...register("modalPremium", { valueAsNumber: true })}
          className="w-full border rounded-lg p-2"
        />
        {errors.modalPremium && (
          <p className="text-red-600 text-sm">{errors.modalPremium.message}</p>
        )}
      </div>

      {/* Premium Frequency */}
      {/* <div>
        <label className="block font-medium mb-1">Premium Frequency</label>
        <select
          {...register("premiumFrequency")}
          className="w-full border rounded-lg p-2"
        >
          {Object.values(PremiumFrequency)
            .filter((v) => typeof v === "number")
            .map((value) => (
              <option key={value} value={value}>
                {PremiumFrequencyLabels[value as PremiumFrequency]}
              </option>
            ))}
        </select>
      </div> */}

      {/* PT */}
      <div>
        <label className="block font-medium mb-1">Policy Term (PT)</label>
        <input
          type="number"
          {...register("pt", { valueAsNumber: true })}
          className="w-full border rounded-lg p-2"
        />
        {errors.pt && (
          <p className="text-red-600 text-sm">{errors.pt.message}</p>
        )}
      </div>

      {/* PPT */}
      <div>
        <label className="block font-medium mb-1">
          Premium Payment Term (PPT)
        </label>
        <input
          type="number"
          {...register("ppt", { valueAsNumber: true })}
          className="w-full border rounded-lg p-2"
        />
        {errors.ppt && (
          <p className="text-red-600 text-sm">{errors.ppt.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default InsuranceFormFields;
