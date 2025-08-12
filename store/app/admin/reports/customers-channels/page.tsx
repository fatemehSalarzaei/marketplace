"use client";
import React, { useState, useEffect } from "react";
import CustomerReportFilters from "@/components/admin/reports/CustomersReport/CustomerReportFilters";
import CustomerStats from "@/components/admin/reports/CustomersReport/CustomerStats";
import CustomerChart from "@/components/admin/reports/CustomersReport/CustomerChart";
import TopCustomersTable from "@/components/admin/reports/CustomersReport/TopCustomersTable";
import { getCustomersReport } from "@/services/admin/reports/customersReportService";
import { CustomerActivity, TopCustomer } from "@/types/admin/report/customersReportTypes";

export default function CustomersReportPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("ماه گذشته");
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState<CustomerActivity[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [totalNewCustomers, setTotalNewCustomers] = useState(0);
  const [totalActiveCustomers, setTotalActiveCustomers] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await getCustomersReport({
        start_date: fromDate || undefined,
        end_date: toDate || undefined,
        top_n: 10,
      });
      setTotalNewCustomers(res.new_customers_count);
      setTotalActiveCustomers(res.active_customers_count);
      setTopCustomers(res.top_customers);

      // در اینجا باید داده‌های customerActivityData از API بیاد
      setFilteredData([]); // فعلاً خالی چون API جداگانه نیاز دارد
    }
    fetchData();
  }, [fromDate, toDate, selectedPeriod, useCustomRange]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">گزارشات مشتریان</h1>

      <CustomerReportFilters
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        useCustomRange={useCustomRange}
        setUseCustomRange={setUseCustomRange}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        periods={["دیروز", "هفته گذشته", "ماه گذشته", "سال گذشته"]}
      />

      <CustomerStats
        totalNewCustomers={totalNewCustomers}
        totalActiveCustomers={totalActiveCustomers}
      />

      <CustomerChart data={filteredData} useCustomRange={useCustomRange} />

      <TopCustomersTable topCustomers={topCustomers} />
    </div>
  );
}
