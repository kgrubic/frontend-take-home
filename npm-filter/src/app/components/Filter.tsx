"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface FilterProps {
  setDebauncedValue: Dispatch<SetStateAction<string>>;
}

const Filter = ({ setDebauncedValue }: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filter, setFilter] = useState<string>(
    searchParams.get("search")?.toString() || ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebauncedValue(filter);
      const params = new URLSearchParams(searchParams.toString());
      if (filter.length > 0) {
        params.set("search", filter);
        router.push(pathname + "?" + params);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [filter, 500]);

  return (
    <div className="grid grid-cols-8 border-solid border-2 rounded-md border-black w-96 h-8">
      <input
        type="text"
        name="filter"
        className="col-span-7"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <div
        className="flex justify-center bg-slate-200 hover:bg-blue-400 hover:cursor-pointer"
        onClick={() => setFilter("")}
        id="clear"
      >
        x
      </div>
    </div>
  );
};

export default Filter;
