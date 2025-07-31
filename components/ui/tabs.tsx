

interface TabsProps {
  total: number;
  lostCount: number;
  foundCount: number;
  selected: string;
  onChange: (type: string) => void;
}

export const Tabs = ({
  total,
  lostCount,
  foundCount,
  selected,
  onChange,
}: TabsProps) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
        <button
          onClick={() => onChange("all")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
            selected === "all"
              ? "bg-white text=gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All Items ({total})
        </button>
        <button
          onClick={() => onChange("lost")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
            selected === "lost"
              ? "bg-white text=gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Lost ({lostCount})
        </button>
        <button
          onClick={() => onChange("found")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
            selected === "found"
              ? "bg-white text=gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Found ({foundCount})
        </button>
      </div>
    </div>
  );
};
