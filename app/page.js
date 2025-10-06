import GridContainer6Zone from "@/components/GridTemplate/GridContainer6Zone";

// This is a server component by default
export default async function HomePage() {
  const layoutId = "73"; // Default layout ID 71 73 79 109 185 180
  const res = await fetch(
    `https://signage.lotusdm.com/api/gridtemplateapi/${layoutId}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    // You can render an error UI here
    return <div>Error loading data</div>;
  }
  const data = await res.json();

  return (
    <div>
      <GridContainer6Zone data={data} />
    </div>
  );
}
