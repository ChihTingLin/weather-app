"use client";
import { useEffect, useState } from "react";
import { locations } from "./staticData";
import dayjs from "dayjs";

export default function Home() {
  const [location, setLocation] = useState(locations[0]);
  const [locationData, setLocationData] = useState<any>(null);
  const loc = decodeURIComponent(location);

  useEffect(() => {
    fetch(`/api/weather?locationName=${loc}`)
      .then((res) => res.json())
      .then((d) => setLocationData(d.records.location[0]));
  }, [loc]);

  return (
    <div className="">
      <p className="mb-6">未來36小時天氣預報</p>
      <div className="text-xl text-center mb-6 border border-grey-300 py-6 rounded-lg">
        <select onChange={(e) => setLocation(e.target.value)}>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      {locationData &&
        Object.keys(locationData?.displayData).map((time) => {
          const d = locationData.displayData[time];
          return (
            <div
              key={time}
              className="mb-4 pb-4 border-b border-grey-500 last-of-type:border-b-0"
            >
              <p className="text-lg">
                {dayjs(time).format("YYYY/MM/DD HH:mm")}
              </p>
              {Object.values(d).map((el: any) => (
                <div key={el.label}>
                  <p>
                    {el.label}: {el.parameterName}{" "}
                    {el.unit && <span>{el.unit}</span>}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
}
