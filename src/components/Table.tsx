import React from "react";

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto rounded-md shadow-sm">
    <table className="min-w-full text-sm text-left text-gray-700">
      {children}
    </table>
  </div>
);

const Head = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
    {children}
  </thead>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-gray-50">{children}</tr>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 font-medium">{children}</th>
);

const Td = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <td className={`px-4 py-3 ${className}`}>{children}</td>;

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Th = Th;
Table.Td = Td;

export default Table;
