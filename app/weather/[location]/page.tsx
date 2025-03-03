import dayjs from "dayjs";

export default async function LocationWeather({
  params,
}: {
  params: Promise<{ location: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { location } = await params;
  const loc = decodeURIComponent(location);
  const weather = await fetch(
    `http://localhost:3000/api/weather?locationName=${loc}`
  ).then((res) => res.json());

  return (
    <div className="">
      <p className="mb-10">未來36小時天氣預報</p>
      <h1 className="text-2xl text-center mb-10 border border-grey-300 py-6 rounded-lg">
        {loc}
      </h1>
      {weather &&
        Object.keys(weather?.records?.location[0]?.displayData).map((time) => {
          const d = weather.records.location[0].displayData[time];
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
