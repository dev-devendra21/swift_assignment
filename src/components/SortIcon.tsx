import React from "react";
import {
  PiCaretDownThin,
  PiCaretUpDownThin,
  PiCaretUpThin,
} from "react-icons/pi";

type SortIconProps = { sortBy: string; order: string };
const SortIcon: React.FC<SortIconProps> = ({ sortBy, order }) => {
  const className = `ml-1 inline-block w-5 h-5`;
  const renderIcon = () => {
    return order === "asc" ? (
      <PiCaretDownThin className={className} />
    ) : order === "desc" ? (
      <PiCaretUpThin className={className} />
    ) : (
      <PiCaretUpDownThin className={className} />
    );
  };
  switch (sortBy) {
    case "name":
      return renderIcon();
    case "email":
      return renderIcon();
    case "id":
      return renderIcon();
  }
};

export default SortIcon;
