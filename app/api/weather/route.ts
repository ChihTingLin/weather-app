import { NextResponse } from "next/server";
import { weatherElements } from "../../staticData";

export interface El {
  startTime: string
  endTime: string
  parameter: {
    parameterName: string
    parameterUnit?: string
    parameterValue?: number
  }
}

export interface DisplayEl {
  Wx?: {
    paramterName: string
    parameterValue: string
  }
  PoP?: {
    parameterName: string
    parameterUnit: string
  }
  MinT: {
    parameterName: string
    parameterUnit: string
  }
  MaxT: {
    parameterName: string
    parameterUnit: string
  }
  CI?: {
    parameterName: string
  }
}

export interface WeatherEl {
  elementName: string
  time: El[]
  displayData?: DisplayEl
}

export interface LocationEl {
  locationName: string
  weatherElement: WeatherEl[]
  displayData?: DisplayEl
}

const getDisplayData = (weatherElement:WeatherEl[]) => {
  return weatherElement.reduce((o:any, el) => {
    el.time.forEach((t:El) => {
      if (!o[t.startTime]) o[t.startTime] = {};
      o[t.startTime] = {
        ...o[t.startTime],
        [el.elementName]: {
          ...t.parameter,
          ...weatherElements[el.elementName],
        },
      };
    });
    return o;
  }, {});
};
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationName = searchParams.get("locationName");
  const res = await fetch(
    `${process.env.API_PREFIX}/F-C0032-001?Authorization=${process.env.API_KEY}&locationName=${locationName}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  data.records.location = data.records.location.map((loc:LocationEl) => {
    loc.displayData = getDisplayData(loc.weatherElement);
    return loc
  });
  return NextResponse.json(data);
}
