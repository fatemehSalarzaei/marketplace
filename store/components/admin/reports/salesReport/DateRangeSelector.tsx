'use client';
import React from 'react';

interface Props {
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  useCustomRange: boolean;
  setUseCustomRange: (value: boolean) => void;
  customFromDate: string;
  setCustomFromDate: (value: string) => void;
  customToDate: string;
  setCustomToDate: (value: string) => void;
  periodOptions: string[];
}

export default function DateRangeSelector({
  selectedPeriod,
  setSelectedPeriod,
  useCustomRange,
  setUseCustomRange,
  customFromDate,
  setCustomFromDate,
  customToDate,
  setCustomToDate,
  periodOptions
}: Props) {
  return (
    <div className="mb-6 space-y-3">
      <label className="block font-semibold">نوع بازه زمانی:</label>
      <div className="flex items-center gap-4">
        <select
          disabled={useCustomRange}
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {periodOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useCustomRange}
            onChange={() => setUseCustomRange(!useCustomRange)}
          />
          بازه دلخواه
        </label>
      </div>

      {useCustomRange && (
        <div className="flex items-center gap-4">
          <div>
            <label className="block mb-1 font-semibold">از تاریخ:</label>
            <input
              type="date"
              value={customFromDate}
              onChange={(e) => setCustomFromDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">تا تاریخ:</label>
            <input
              type="date"
              value={customToDate}
              onChange={(e) => setCustomToDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
