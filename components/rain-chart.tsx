"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface RainChartProps {
  data: {
    time: string
    chance: number
  }[]
}

export default function RainChart({ data }: RainChartProps) {
  // Custom Y axis labels
  const yLabels = [100, 50, 0];
  const yLabelMap = {
    100: <tspan style={{ fill: '#4FC3F7', fontWeight: 700 }}>Rainy</tspan>,
    50: <tspan style={{ fill: '#FFD600', fontWeight: 700 }}>Sunny</tspan>,
    0: <tspan style={{ fill: '#B3B8C5', fontWeight: 700 }}>Heavy</tspan>,
  };

  return (
    <div className="w-full h-40 bg-[#23242B] rounded-xl shadow-md p-2 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 32, right: 8, top: 8, bottom: 8 }}>
          <YAxis
            type="number"
            domain={[0, 100]}
            ticks={yLabels}
            axisLine={false}
            tickLine={false}
            width={60}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y + 6}
                textAnchor="end"
                fontSize={18}
                fontWeight={700}
                letterSpacing={1}
                style={{ dominantBaseline: 'middle' }}
              >
                {yLabelMap[payload.value as 0 | 50 | 100] || ''}
              </text>
            )}
            tickMargin={12}
          />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#B3B8C5', fontSize: 15, fontWeight: 600 }}
          />
          <Bar dataKey="chance" fill="#4FC3F7" radius={[8, 8, 0, 0]} barSize={32} />
          <g>
            {data.map((_, i) => (
              <line
                key={i}
                x1={`${(100 / data.length) * i}%`}
                y1="0"
                x2={`${(100 / data.length) * i}%`}
                y2="100%"
                stroke="#333"
                strokeDasharray="4 2"
                opacity="0.5"
              />
            ))}
          </g>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
