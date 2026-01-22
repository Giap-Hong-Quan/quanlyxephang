import React, { useState, useEffect, useMemo } from "react";
import { CalendarOutlined, CheckCircleOutlined, PhoneOutlined, BookOutlined } from "@ant-design/icons";
import "./MainContent.css";
import { getSummaryData, SummaryData } from "./MainContent.logic";
import InfoCard from "../inforCard";
import ChartSection from "../charts";

const MainContent: React.FC = () => {
  const token = localStorage.getItem('token') ?? '';
  const [stats, setStats] = useState<SummaryData>({ total: 0, connected: 0, active: 0 });

  useEffect(() => {
    const fetchStatistic = async () => {
      const data = await getSummaryData(token);
      if (data) setStats(data);
    };
    fetchStatistic();
  }, [token]);

  // Dùng useMemo để tính toán lại các thẻ khi stats thay đổi
  const cardsData = useMemo(() => {
    const skipped = stats.total - stats.active - stats.connected;
    const getPercent = (val: number) => stats.total > 0 ? `${Math.ceil((val * 100) / stats.total)}%` : "0%";

    return [
      {
        icon: <CalendarOutlined style={{ color: "#409EFF" }} />,
        title: "Số thứ tự đã cấp",
        value: stats.total,
        percentage: "100%",
        isPositive: true,
      },
      {
        icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
        title: "Số thứ tự đã sử dụng",
        value: stats.connected,
        percentage: getPercent(stats.connected),
        isPositive: false,
      },
      {
        icon: <PhoneOutlined style={{ color: "#FA8C16" }} />,
        title: "Số thứ tự đang chờ",
        value: stats.active,
        percentage: getPercent(stats.active),
        isPositive: true,
      },
      {
        icon: <BookOutlined style={{ color: "#F5222D" }} />,
        title: "Số thứ tự đã bỏ qua",
        value: skipped > 0 ? skipped : 0,
        percentage: getPercent(skipped > 0 ? skipped : 0),
        isPositive: false,
      },
    ];
  }, [stats]);

  return (
    <div className="main-content">
      <h2>Biểu đồ cấp số</h2>
      <div className="info-cards">
        {cardsData.map((card, index) => (
          <InfoCard key={index} {...card} />
        ))}
      </div>
      <div className="chart-container">
        <ChartSection />
      </div>
    </div>
  );
};

export default MainContent;