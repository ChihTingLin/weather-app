"use client";
import { locations } from "@/app/staticData";
import Chart from "@/components/Chart";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Location = {
  LocationName: string;
  Geocode: string;
  Latitude: string;
  Longitude: string;
  WeatherElement: [];
};

type CityLocation = {
  DatasetDescription: string;
  LocationName: string;
  Dataid: string;
  Location: Location[];
};

const getChartsOption = (weatherElement: any) => {
  return weatherElement.reduce(
    (opt: any, el: any, index: number) => {
      if (![1, 2].includes(index)) return opt;
      if (index === 1) {
        opt.xAxis.data = el.Time.map((t: any) =>
          dayjs(t.StartTime).format("MM/DD HH:mm ddd")
        );
      }
      opt.legend.data.push(el.ElementName);
      opt.series.push({
        name: el.ElementName,
        type: "line",
        data: el.Time.map((t: any) => Object.values(t.ElementValue[0])[0]),
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
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
        type: "value",
        axisLabel: {
          formatter: "{value} °C",
        },
      },
      series: [],
    }
  );
};

const getTableData = (loc: CityLocation) => {
  const newLoc: { table: { [key: string]: string }[] } = {
    ...loc,
    table: [],
  };
  loc.Location.forEach((l: any) => {
    const row: { location: string; [key: string]: string } = {
      location: l.LocationName,
    };
    l.WeatherElement[1].Time.forEach(
      (
        t: {
          StartTime: string;
          EndTime: string;
          ElementValue: {
            MinTemperature?: string;
            MaxTemperature?: string;
          }[];
        },
        idx: number
      ) => {
        const minTemperature = l.WeatherElement[2].Time[idx];
        const start = dayjs(t.StartTime);
        const day_night = start.hour() <= 12 ? "白天" : "晚上";
        const key = `${start.format("MM/DD")}_${
          day_night === "白天" ? "am" : "pm"
        }`;
        const value = `${minTemperature.ElementValue?.[0]?.MinTemperature} ~ ${t.ElementValue?.[0]?.MaxTemperature}`;
        row[key] = value;
      }
    );
    newLoc.table.push(row);
  });
  return newLoc;
};
const columnHelper = createColumnHelper();
const getTableColumns = (weatherElement: any) => {
  const dataCols = weatherElement.Time.map((t: any) => {
    const start = dayjs(t.StartTime);
    const day_night = start.hour() <= 12 ? "白天" : "晚上";
    return columnHelper.accessor(
      `${start.format("MM/DD")}_${day_night === "白天" ? "am" : "pm"}`,
      {
        header: `${start.format("MM/DD")} ${day_night}`,
        id: `${start.format("MM/DD")}_${day_night === "白天" ? "am" : "pm"}`,
        cell: (i) => <span className="whitespace-nowrap">{i.getValue()}</span>,
      }
    );
  });
  return [
    columnHelper.accessor("location", {
      header: "地點",
      id: "location",
      cell: (i) => <div className="whitespace-nowrap">{i.getValue()}</div>,
    }),
    ...dataCols,
  ];
};

export default function WeeklyWeather() {
  const [location, setLocation] = useState(locations[0]);
  const [distIndex, setDistIndex] = useState<number>(-1);
  const [data, setData] = useState<any>(null);
  const [columns, setColumns] = useState<any | null>(null);
  const tableData = useMemo(() => (data ? data.table : []), [data]);
  const dists = useMemo(() => {
    return data?.Location?.map((l: any) => ({
      value: l.LocationName,
      label: l.LocationName,
    }));
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    fetch(`/api/weather/weekly?locationName=${location}`)
      .then((res) => res.json())
      .then((json) => {
        json.chart = json.Location.map((l: any) =>
          getChartsOption(l.WeatherElement)
        );
        const manipulatedData = getTableData(json);
        setData(manipulatedData);
        setColumns(getTableColumns(json.Location[0].WeatherElement[0]));
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
      </div>
      {data && columns && (
        <div className="overflow-x-auto relative border border-gray-300 mb-6">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => (
                    <th
                      key={header.id}
                      className={`border border-gray-200 ${
                        i === 0
                          ? "sticky bg-gray-100 w-max left-[-1px] border-l border-gray-200"
                          : "p-2"
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.map((row) => (
                <tr key={row.id} className="hover:bg-slate-100">
                  {row.getVisibleCells().map((cell, i) => (
                    <td
                      key={cell.id}
                      className={`border border-gray-20 p-2 ${
                        i === 0 ? "sticky bg-gray-100 w-max left-[-1px]" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data && (
        <div>
          {dists && (
            <select
              className="text-xl"
              onChange={(e) => setDistIndex(parseInt(e.target.value))}
            >
              {dists.map((d: { value: string; label: string }, i: number) => (
                <option key={i} value={i}>
                  {d.label}
                </option>
              ))}
            </select>
          )}
          <Chart options={data.chart[distIndex]} />
        </div>
      )}
    </div>
  );
}
