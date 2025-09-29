import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const layoutId = searchParams.get("layout_id");

  if (!layoutId) {
    return NextResponse.json({ error: "Layout ID required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://signage.lotusdm.com/api/gridtemplateapi/${layoutId}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Error fetching grid data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
