"use client";
import React from "react";

interface Props {
  selectedPeriod: string;
  setSelectedPeriod: (val: string) => void;
  useCustomRange: boolean;
  setUseCustomRange: (val: boolean) => void;
  fromDate: string;
  setFromDate: (val: string) => void;
  toDate: string;
  setToDate: (val: string) => void;
  periods: string[];
}

export default function CustomerReportFilters({
  selectedPeriod,
  setSelectedPeriod,
  useCustomRange,
  setUseCustomRange,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  periods,
}: Props) {
  return (
    <div className="mb-6 space-y-3 max-w-md">
      <label className="block font-semibold">نوع بازه زمانی:</label>
      <div className="flex items-center gap-4">
        <select
          disabled={useCustomRange}
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        >
          {periods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 flex-shrink-0">
          <input
            type="checkbox"
            checked={useCustomRange}
            onChange={() => setUseCustomRange(!useCustomRange)}
          />
          بازه دلخواه
        </label>
      </div>

      {useCustomRange && (
        <div className="flex gap-4 mt-2">
          <div className="flex flex-col flex-1">
            <label className="mb-1 font-semibold">از تاریخ:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="mb-1 font-semibold">تا تاریخ:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
