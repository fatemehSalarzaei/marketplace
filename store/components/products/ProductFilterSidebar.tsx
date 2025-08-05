"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCategoryFilters } from "@/services/categories/getCategoryFilters";
import { FilterOption } from "@/types/categoryFilter";
import { Slider } from "@mui/material";

interface Props {
  onFilter: (filters: any) => void;
}

export default function ProductFilterSidebar({ onFilter }: Props) {
  const { slug } = useParams();
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: any;
  }>({});
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (!slug) return;

    const fetchFilters = async () => {
      try {
        const data = await getCategoryFilters(slug as string);
        setFilters(data);

        const priceFilter = data.find((f) => f.title === "قیمت");
        if (priceFilter && typeof priceFilter.values === "object") {
          const { min, max } = priceFilter.values as {
            min: number;
            max: number;
          };
          setPriceRange([min, max]);
          setSelectedFilters((prev) => ({
            ...prev,
            قیمت: [min, max],
          }));
        }
      } catch (err) {
        console.error("خطا در دریافت فیلترها:", err);
      }
    };

    fetchFilters();
  }, [slug]);

  const toggleFilter = (idx: number) => {
    setExpanded((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleCheckboxChange = (
    filterTitle: string,
    value: any,
    checked: boolean
  ) => {
    const valToStore =
      typeof value === "string"
        ? value
        : filterTitle === "برند"
        ? value.id.toString()
        : value.name || value.id || value;

    setSelectedFilters((prev) => {
      const prevValues = prev[filterTitle] || [];
      if (checked) {
        return { ...prev, [filterTitle]: [...prevValues, valToStore] };
      } else {
        return {
          ...prev,
          [filterTitle]: prevValues.filter((v: any) => v !== valToStore),
        };
      }
    });
  };

  const handlePriceChange = (_: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
      setSelectedFilters((prev) => ({
        ...prev,
        قیمت: newValue,
      }));
    }
  };

  const handleApplyFilters = () => {
    const apiFilters: any = {
      category_slug: slug,
    };

    const attributeFilters: { [key: string]: string[] } = {};

    for (const key in selectedFilters) {
      const value = selectedFilters[key];

      if (key === "قیمت") {
        apiFilters.min_price = value[0];
        apiFilters.max_price = value[1];
      } else if (key === "وضعیت موجودی") {
        const statusValues: string[] = [];
        if (value.includes("موجود")) statusValues.push("in_stock");
        if (value.includes("ناموجود")) statusValues.push("out_of_stock");
        if (statusValues.length)
          apiFilters.availability_status = statusValues.join(",");
      } else if (key === "برند") {
        apiFilters.brand = value.join(",");
      } else {
        const filterSlug = filters.find((f) => f.title === key)?.slug;
        if (filterSlug) {
          attributeFilters[filterSlug] = value;
        }
      }
    }

    const attributeParts = Object.entries(attributeFilters).map(
      ([slug, values]) => `${slug}:${values.join("|")}`
    );
    if (attributeParts.length) {
      apiFilters.attribute = attributeParts.join(",");
    }

    console.log("✅ Applying filters, selectedFilters:", selectedFilters);
    console.log("🔗 Sending API params:", apiFilters);
    console.log("📦 Sending slug:", slug);

    onFilter(apiFilters);
  };

  return (
    <div className="shadow-md rounded-xl p-4 sticky top-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-lg">فیلترها</h4>
        <button
          className="text-sm text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition"
          onClick={handleApplyFilters}
        >
          اعمال فیلتر
        </button>
      </div>

      {filters.map((filter, idx) => (
        <div key={idx} className="mb-4 border-b pb-2">
          <button
            onClick={() => toggleFilter(idx)}
            className="w-full text-right font-medium text-gray-800 focus:outline-none"
          >
            {filter.title}
          </button>

          {expanded.includes(idx) && (
            <>
              {Array.isArray(filter.values) ? (
                <ul className="space-y-1 text-sm mt-2">
                  {(filter.values as any[]).map((value, index) => {
                    const valToCheck =
                      filter.title === "برند"
                        ? typeof value === "string"
                          ? value
                          : value.id.toString()
                        : typeof value === "string"
                        ? value
                        : value.name || value;

                    return (
                      <li key={index}>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox accent-blue-600"
                            checked={
                              selectedFilters[filter.title]
                                ? selectedFilters[filter.title].includes(
                                    valToCheck
                                  )
                                : false
                            }
                            onChange={(e) =>
                              handleCheckboxChange(
                                filter.title,
                                value,
                                e.target.checked
                              )
                            }
                          />
                          {typeof value === "string" ? value : value.name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              ) : filter.title === "قیمت" ? (
                <div className="mt-2">
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={(filter.values as any).min}
                    max={(filter.values as any).max}
                    step={100000}
                    size="small"
                    sx={{ color: "#2563eb", direction: "ltr" }}
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1 px-1">
                    <span>{priceRange[0].toLocaleString()} تومان</span>
                    <span>{priceRange[1].toLocaleString()} تومان</span>
                  </div>
                </div>
              ) : filter.title === "وضعیت موجودی" ? (
                <ul className="space-y-1 text-sm mt-2">
                  {["موجود", "ناموجود"].map((status) => (
                    <li key={status}>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox accent-blue-600"
                          checked={
                            selectedFilters[filter.title]
                              ? selectedFilters[filter.title].includes(status)
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              filter.title,
                              status,
                              e.target.checked
                            )
                          }
                        />
                        {status}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
