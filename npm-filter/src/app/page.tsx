"use client";

import { Suspense, useState } from "react";
import Filter from "./components/Filter";
import List from "./components/List";
import Loading from "./loading";

export default function Home() {
  const [debaoundedValue, setDebauncedValue] = useState<string>("");
  return (
    <div className="flex py-16 justify-center">
      <div>
        <Filter setDebauncedValue={setDebauncedValue} />
        <Suspense fallback={<Loading />}>
          <List filter={debaoundedValue} />
        </Suspense>
      </div>
    </div>
  );
}
