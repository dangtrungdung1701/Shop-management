import { useRerender } from "hooks/useRerender";
import { ReactNode, useEffect, useRef } from "react";

interface IPriceInputProps {
  label?: string;
  className?: string;
  initValues?: number[];
  columns: (string | ReactNode)[];
  onChange: (data: number[]) => void;
}

const PriceInputs: React.FC<IPriceInputProps> = ({
  label,
  initValues,
  columns,
  className = "",
  onChange,
}) => {
  const rerender = useRerender();
  const data = useRef<number[]>(
    initValues || new Array(columns.length).fill(0),
  );

  useEffect(() => {
    data.current = initValues || [];
    rerender();
  }, [initValues]);

  return (
    <div className={className}>
      {label && <p className="text-lg font-semibold mb-1.5">{label}</p>}
      <div className="overflow-x-auto">
        <div className="flex flex-row border border-r-0 border-solid w-min border-table">
          {columns.map((col, index) => (
            <div
              key={index}
              className="border-r border-solid border-table"
              style={{ minWidth: "140px" }}
            >
              <div className="flex items-center justify-center w-full py-1 font-semibold bg-b-1">
                {col}
              </div>
              <div className="py-0.5 px-1 border-t border-solid border-table ">
                <input
                  type="number"
                  defaultValue={data.current[index]}
                  min={0}
                  onChange={e => {
                    if (!data.current) return;
                    const val = Number(e.target.value);
                    data.current[index] = val;
                    onChange(data.current);
                  }}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceInputs;
