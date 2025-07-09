import React from "react";
import {
  PiCaretDownThin,
  PiCaretUpDownThin,
  PiCaretUpThin,
} from "react-icons/pi";

type SortIconProps = {
  column: string;
  sortBy: string;
  order: string;
};

const SortIcon: React.FC<SortIconProps> = ({ column, sortBy, order }) => {
  const className = `ml-1 inline-block w-5 h-5`;

  if (sortBy === column) {
    return order === "asc" ? (
      <PiCaretUpThin className={className} />
    ) : order === "desc" ? (
      <PiCaretDownThin className={className} />
    ) : (
      <PiCaretUpDownThin className={className} />
    );
  }

  return <PiCaretUpDownThin className={className} />;
};

export default SortIcon;
