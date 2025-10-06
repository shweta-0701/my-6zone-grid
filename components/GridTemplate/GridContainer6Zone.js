"use client";

import { useEffect } from "react";
import DynamicSection from "./DynamicSection";
import DisclaimerSection from "./DisclaimerSection";

// Zone configuration matching your original setup
const ZONE_CONFIG = [
  { id: "dynamic-section-1", dataIdx: 0, zoneNo: 1 },
  { id: "dynamic-section-2", dataIdx: 3, zoneNo: 4 },
  { id: "dynamic-section-3", dataIdx: 1, zoneNo: 2 },
  { id: "dynamic-section-4", dataIdx: 4, zoneNo: 5 },
  { id: "dynamic-section-5", dataIdx: 2, zoneNo: 3 },
  { id: "dynamic-section-6", dataIdx: 5, zoneNo: 6 },
];

export default function GridContainer6Zone({ data }) {
  useEffect(() => {
    if (data) {
      adjustSectionHeights(data.zone_data);
    }
  }, [data]);

  if (!data || !data.zone_data) return <div>No data available</div>;

  const getZoneByNumber = (zoneData, zoneNo) => {
    return zoneData.find((zone) => zone.zone_number === zoneNo) || {};
  };

  return (
    <>
      <div className="DSA-Template">
        <div className="grid-row">
          {[0, 1, 2].map((index) => (
            <div key={index} className="grid-column">
              <DynamicSection
                key={ZONE_CONFIG[index].id}
                sectionId={ZONE_CONFIG[index].id}
                zone={getZoneByNumber(
                  data.zone_data,
                  ZONE_CONFIG[index].zoneNo
                )}
                zoneData={data.zone_data}
                dataIdx={ZONE_CONFIG[index].dataIdx}
              />
            </div>
          ))}
        </div>
        <div className="grid-row">
          {[3, 4, 5].map((index) => (
            <div key={index} className="grid-column">
              <DynamicSection
                key={ZONE_CONFIG[index].id}
                sectionId={ZONE_CONFIG[index].id}
                zone={getZoneByNumber(
                  data.zone_data,
                  ZONE_CONFIG[index].zoneNo
                )}
                zoneData={data.zone_data}
                dataIdx={ZONE_CONFIG[index].dataIdx}
              />
            </div>
          ))}
        </div>
      </div>
      <DisclaimerSection disclaimer={data.disclaimer} />
    </>
  );
}

function adjustSectionHeights(zoneData) {
  const getZoneByNumber = (zoneData, zoneNo) => {
    if (!zoneData || !Array.isArray(zoneData)) return {};
    if (!zoneData || !Array.isArray(zoneData)) return {};
    return zoneData.find((zone) => zone.zone_number === zoneNo) || {};
  };

  const sections = ZONE_CONFIG.map((config) => ({
    el: document.getElementById(config.id),
    type: getZoneByNumber(zoneData, config.zoneNo).zone_type,
  }));

  const setMediaHeight = (section, height) => {
    ["img", "video"].forEach((tag) => {
      section.querySelectorAll(tag).forEach((el) => {
        el.style.setProperty("height", height, "important");
      });
    });
  };

  const adjustPair = (sec1, sec2) => {
    if (!sec1.el || !sec2.el) return;

    const mediaTypes = ["Image", "Video", "Slideshow"];
    if (sec1.type === "Menu" && sec2.type === "Menu") {
      sec1.el.style.height = sec2.el.style.height = "48.5vh";
    } else if (sec1.type === "Menu" && mediaTypes.includes(sec2.type)) {
      sec1.el.style.height = "57vh";
      sec2.el.style.height = "40vh";
      setMediaHeight(sec2.el, "40vh");
    } else if (sec2.type === "Menu" && mediaTypes.includes(sec1.type)) {
      sec1.el.style.height = "40vh";
      sec2.el.style.height = "57vh";
      setMediaHeight(sec1.el, "40vh");
    } else if (
      mediaTypes.includes(sec1.type) &&
      mediaTypes.includes(sec2.type)
    ) {
      sec1.el.style.height = sec2.el.style.height = "48.5vh";
      setMediaHeight(sec1.el, "48.5vh");
      setMediaHeight(sec2.el, "48.5vh");
    }
  };

  // Adjust pairs: Zone 1&4, Zone 2&5, Zone 3&6
  adjustPair(sections[0], sections[1]); // Zone 1 & 4
  adjustPair(sections[2], sections[3]); // Zone 2 & 5
  adjustPair(sections[4], sections[5]); // Zone 3 & 6
}
