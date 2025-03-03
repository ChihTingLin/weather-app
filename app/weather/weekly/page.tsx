"use client";
import { locations } from "@/app/staticData";
import Chart from "@/components/Chart";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

const getChartsOption = (weatherElement: any) => {
  return weatherElement.reduce(
    (opt, el, index) => {
      if (![1, 2].includes(index)) return opt;
      if (index === 1) {
        opt.xAxis.data = el.Time.map((t) =>
          dayjs(t.StartTime).format("MM/DD HH:mm ddd")
        );
      }
      opt.legend.data.push(el.ElementName);
      opt.series.push({
        name: el.ElementName,
        type: "line",
        data: el.Time.map((t) => Object.values(t.ElementValue[0])[0]),
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      });
      return opt;
    },
    {
      title: {
        // text: "一週天氣預測",
      },
      tooltip: {},
      legend: {
        data: [],
      },
      xAxis: {
        data: [],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [],
    }
  );
};
export default function WeeklyWeather() {
  const [location, setLocation] = useState(locations[0]);
  const [distIndex, setDistIndex] = useState<number>(-1);
  const [data, setData] = useState(null);
  const dists = useMemo(() => {
    return data?.Location?.map((l) => ({
      value: l.LocationName,
      label: l.LocationName,
    }));
  }, [data]);

  useEffect(() => {
    fetch(`/api/weather/weekly?locationName=${location}`)
      .then((res) => res.json())
      .then((json) => {
        json.chart = json.Location.map((l) =>
          getChartsOption(l.WeatherElement)
        );
        setData(json);
        setDistIndex(0);
      });
  }, [location]);

  return (
    <div>
      <div className="mb-4">
        <select
          className="text-xl"
          onChange={(e) => setLocation(e.target.value)}
        >
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        {dists && (
          <select
            className="text-xl"
            onChange={(e) => setDistIndex(parseInt(e.target.value))}
          >
            {dists.map((d, i) => (
              <option key={i} value={i}>
                {d.label}
              </option>
            ))}
          </select>
        )}
      </div>
      {data && <Chart options={data.chart[distIndex]} />}
    </div>
  );
}
