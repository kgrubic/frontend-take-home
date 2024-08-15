"use client";

/* Filter input component that will fetch data with debauce after 1/2 secondes */
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
      // if filter is "" - empty string, remove search from query params or add it to URL
      if (filter.length > 0) {
        params.set("search", filter);
        router.push(pathname + "?" + params);
      } else {
        params.delete("search");
        router.push(pathname);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [filter, router, setDebauncedValue, pathname, searchParams]);

  return (
    <div className="grid grid-cols-8 border-solid border-2 rounded-md border-black md:w-96 w-48 h-12">
      <input
        type="text"
        name="filter"
        className="col-span-7 outline-none text-lg"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <div
        className="flex justify-center items-center bg-slate-200 hover:bg-blue-100 hover:cursor-pointer"
        onClick={() => setFilter("")}
        id="clear"
      >
        x
      </div>
    </div>
  );
};

export default Filter;
