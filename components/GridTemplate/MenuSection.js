"use client";

import Image from "next/image";
import React from "react";

export default function MenuSection({ sections }) {
  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className="menu-section">
          <div className="px-4 py-4">
            {renderMenuHeader(section.header_details)}
            <div className="position-relative z-1">
              <table className="w-100 mt-2">
                {renderMenuColumns(section.column_title_details)}
                {renderMenuItems(section.menus)}
              </table>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function renderMenuHeader(header) {
  if (!header.title_content) return null;

  const headerStyles = {
    fontSize: header.title_font_size,
    color: header.title_font_color,
    fontFamily: header.title_font_family,
    fontWeight: header.title_font_weight,
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "start",
  };

  return (
    <div
      className="menu-title-name ms-1 d-flex align-items-center"
      style={{
        display: header.title_content ? "block" : "none",
        marginBottom: "-4px",
        borderBottom: "1px solid gray",
      }}
    >
      <span className="menuTitle" style={headerStyles}>
        {header.title_content}
        {header.title_icon_image && (
          <Image
            src={header.title_icon_image}
            width={parseInt(header.title_icon_width) || 50}
            height={parseInt(header.title_icon_height) || 50}
            style={{
              height: header.title_icon_height,
              width: header.title_icon_width,
            }}
            className="show-image"
            alt="Menu icon"
          />
        )}
      </span>
    </div>
  );
}

function renderMenuColumns(columnDetails) {
  const cols = columnDetails.colum_title_data;
  const hasColumns = Object.values(cols).some(Boolean);

  if (!hasColumns) return null;

  return (
    <thead
      className="MenuItemDesc w-100"
      style={{
        display: hasColumns ? "table-header-group" : "none",
      }}
    >
      <tr
        className="foodItem w-100"
        style={{
          backgroundColor: columnDetails.column_title_background,
          fontFamily: columnDetails.column_title_font_family,
          fontWeight: columnDetails.column_title_font_weight,
        }}
      >
        {Object.values(cols).map((col, index) => (
          <td
            key={index}
            className={index === 0 ? "ps-2" : "ps-0 text-center"}
            style={{
              fontSize: columnDetails.column_title_font_size,
              color: columnDetails.column_title_color,
            }}
          >
            {col || ""}
          </td>
        ))}
      </tr>
    </thead>
  );
}

function renderMenuItems(menus) {
  if (!menus || !menus.menu_item_data) return null;

  return (
    <tbody className="product-list">
      {menus.menu_item_data.map((item, index) => {
        const isSoldOut = item.item_sold === 1;
        const isVeg = item.item_category === 1;
        const hasDesc = item.item_description?.trim();

        // Fix: Create proper style object instead of string
        const rowStyle = {
          position: "relative",
          borderBottom: !hasDesc && !isVeg ? "0px solid black" : "none",
          
        };

        return (
          <React.Fragment key={index}>
            <tr
              className={`product-menuItem-name ${isSoldOut ? "sold-out" : ""}`}
              style={rowStyle}
            >
              <td
                className="ps-1 pb-2"
                style={{ ...menuItemStyles(menus.menu_item_css), paddingBottom: "8px" }}
              >
                {isVeg
                  ? renderVegCategory(item, menus.category)
                  : item.column_1}
                {isSoldOut && (
                  <span
                    className="sold"
                    style={soldOutStyles(menus.menu_item_css)}
                  >
                    {menus.menu_item_css.sold_out_title}
                  </span>
                )}
              </td>
              {["column_2", "column_3", "column_4"].map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="pb-2 text-center"
                  style={{ ...menuItemStyles(menus.menu_item_css), paddingBottom: "8px" }}
                >
                  {item[col] || ""}
                </td>
              ))}
            </tr>
            {hasDesc && (
              <tr className="description category-0">
                <td
                  colSpan="4"
                  className="ps-1 pb-2"
                  style={menuDescStyles(menus.menu_item_css)}
                >
                  {item.item_description}
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
}

function menuItemStyles(css) {
  return {
    fontFamily: css.menu_item_font_family,
    fontSize: css.menu_item_font_size,
    fontWeight: css.menu_item_font_weight,
    color: css.menu_item_title_color,
    lineHeight: css.menu_item_font_line_height,
  };
}

function soldOutStyles(css) {
  return {
    backgroundColor: css.sold_out_background,
    color: css.sold_out_color,
    fontFamily: css.sold_font_family,
    fontSize: css.sold_font_size,
    fontWeight: css.sold_font_weight,
    padding: "0.8% 1%",
    position: "absolute",
    marginLeft: "5px",
    marginTop: "-3px",
    borderRadius: "5px",
  };
}

function menuDescStyles(css) {
  return {
    fontFamily: css.menu_item_desc_font_family,
    fontSize: css.menu_item_desc_font_size,
    fontWeight: css.menu_item_desc_font_weight,
    color: css.menu_item_desc_title_color,
    lineHeight: css.menu_item_desc_font_line_height,
  };
}

function renderVegCategory(item, categoryCss) {
  return (
    <h3
      className="category-veg mb-0 mt-2"
      style={{
        display: "inline-block",
        backgroundColor: categoryCss.category_background,
        fontFamily: categoryCss.category_font_family,
        fontSize: categoryCss.category_font_size,
        fontWeight: categoryCss.category_font_weight,
        color: categoryCss.category_title_color,
        lineHeight: categoryCss.category_font_line_height,
        textTransform: "uppercase",
        padding: "10px 15px !important",
        borderBottom: "1px solid #333",
        borderRadius: "5px",
      }}
    >
      {item.column_1}
    </h3>
  );
}
