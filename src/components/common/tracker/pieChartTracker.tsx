import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./pieChartTracker.css";

interface PieChartTrackerProps {
  colors: string[];
  title: string;
  data: { name: string; value: number }[];
}

const PieChartTracker: React.FC<PieChartTrackerProps> = ({
  colors,
  title,
  data,
}) => {
  const DEFAULT_CLASS_NAME = "pie-chart-tracker";

  // ✅ Check if both values are 0
  const isEmpty = data.every((entry) => entry.value === 0);

  // ✅ Calculate summary
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const completed = data.find((entry) => entry.name.toLowerCase() === "completed")?.value || 0;
  const remaining = total - completed;

  return (
    <div className={`${DEFAULT_CLASS_NAME}_container`}>
      <h3 className={`${DEFAULT_CLASS_NAME}__title`}>{title}</h3>

      {/* ✅ Summary Section */}
      <div className={`${DEFAULT_CLASS_NAME}__summary`}>
        <p><strong>Total:</strong> {total}</p>
        <p><strong>Completed:</strong> {completed}</p>
        <p><strong>Remaining:</strong> {remaining}</p>
      </div>

      {isEmpty ? (
        <p className={`${DEFAULT_CLASS_NAME}__no-data`}>No data available</p> // ✅ Show message when data is empty
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ value }) => value} // ✅ Show numbers inside chart
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartTracker;
