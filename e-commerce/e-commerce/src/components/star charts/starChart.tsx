import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



const data = [
  {
    name: "5 Stars",
    uv: 5,
    stars: 800,
    amt: 200
  },
  {
    name: "4 Stars",
    uv: 4,
    stars: 121,
    amt: 2000
  },
  {
    name: "3 Stars",
    uv: 3,
    stars: 70,
    amt: 2000
  },
  {
    name: "2 Stars",
    uv: 2,
    stars: 51,
    amt: 2000
  },
  {
    name: "1 Stars",
    uv: 1,
    stars: 1157,
    amt: 2000
  },
  
];

export default function StarChart() {
  return (
    <BarChart
      width={200}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={30}
    >
      
      <Bar dataKey="stars" barSize={8}  fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
}
