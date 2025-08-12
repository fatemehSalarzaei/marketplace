'use client';
import React, { useState, useEffect } from 'react';
import DateRangeSelector from './DateRangeSelector';
import TotalSalesCard from './TotalSalesCard';
import SalesChart from './SalesChart';
import TopProductsTable from './TopProductsTable';
import LowStockProductsTable from './LowStockProductsTable';
import { getSalesReport, getTopProducts, getLowStockProducts } from '@/services/admin/reports/salesReportService';
import { TopProduct, LowStockProduct } from '@/types/admin/report/salesReportTypes';

export default function SalesProductsReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("ماه گذشته");
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [customFromDate, setCustomFromDate] = useState("");
  const [customToDate, setCustomToDate] = useState("");
  const [totalSales, setTotalSales] = useState(0);
  const [salesTrendData, setSalesTrendData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);

  const periodOptions = ["دیروز", "هفته گذشته", "ماه گذشته", "سال گذشته"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesRes = await getSalesReport(customFromDate, customToDate);
        setTotalSales(salesRes.data.total_revenue);
        setSalesTrendData(salesRes.data.sales_trend);

        const topProdRes = await getTopProducts(customFromDate, customToDate);
        setTopProducts(topProdRes.data);

        const lowStockRes = await getLowStockProducts();
        setLowStockProducts(lowStockRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [customFromDate, customToDate]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">گزارشات فروش و محصولات</h1>

      <DateRangeSelector
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        useCustomRange={useCustomRange}
        setUseCustomRange={setUseCustomRange}
        customFromDate={customFromDate}
        setCustomFromDate={setCustomFromDate}
        customToDate={customToDate}
        setCustomToDate={setCustomToDate}
        periodOptions={periodOptions}
      />

      <TotalSalesCard
        totalSales={totalSales}
        periodLabel={useCustomRange ? `${customFromDate} تا ${customToDate}` : selectedPeriod}
      />

      <SalesChart
        data={salesTrendData.map(d => ({ date: d.date, sales: d.total_sales }))}
        useCustomRange={useCustomRange}
      />

      <TopProductsTable products={topProducts} />
      <LowStockProductsTable products={lowStockProducts} />
    </div>
  );
}
