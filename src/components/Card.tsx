import { type ReactNode } from "react";

const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md border border-[#F2F2F2] ${className}`}
    >
      {children}
    </div>
  );
};

Card.Header = ({
  initials,
  name,
  email,
}: {
  initials: string;
  name: string;
  email: string;
}) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
        {initials}
      </div>
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

Card.Grid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );
};

Card.Field = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <div className="bg-gray-100 p-2 rounded text-sm text-gray-800">
        {value}
      </div>
    </div>
  );
};

export default Card;
