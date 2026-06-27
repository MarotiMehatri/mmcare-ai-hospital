import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
function TrendChart({ title, data = [], dataKey, secondaryKey, type }) {
  const formattedData = data.map((item) => {
    const base = {
      date: item.date,
      sugar: item.sugar,
      heartRate: item.heartRate,
      weight: item.weight,
      spo2: item.spo2,
    };

    if (type === "bp") {
      const [top, bottom] = (item.bloodPressure || "0/0")
        .split("/")
        .map(Number);

      return { ...base, bpTop: top, bpBottom: bottom };
    }
    return base;
  });
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} strokeWidth={3} />
            {secondaryKey && (
              <Line type="monotone" dataKey={secondaryKey} strokeWidth={3} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TrendChart;
