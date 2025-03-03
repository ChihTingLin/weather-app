import { cities } from "@/app/staticData";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("locationName");
  if (!city) {
    return NextResponse.json({ status: 'fail', message: 'Invalid city parameter' })
  }
  const dataId = cities.find(c => c.city === decodeURIComponent(city))?.weekData
  const res = await fetch(
    `${process.env.API_PREFIX}/${dataId}?Authorization=${process.env.API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const data = await res.json();
  return NextResponse.json(data?.records?.Locations[0])
}