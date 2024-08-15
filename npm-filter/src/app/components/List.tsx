"use client";
/* Component to list results */
import { useQuery } from "@tanstack/react-query";

import getNpmPackages from "../api/getNpmPackages";
import ListItem from "./ListItem";
import Loading from "../loading";

interface ListItemProps {
  id: number;
  name: string;
  package: {
    name: string;
    description: string;
    links: { npm: string };
    keywords: string[];
  };
}

const List = (ListProps: { filter: string }) => {
  /* React query to stash fetched data. queryKey is a key for cache data */
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getNpmPackages(ListProps.filter as string),
    queryKey: ["npm", ListProps.filter],
    enabled: ListProps.filter !== "",
  });
  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry There was an Error</div>;
  if (data?.lenght === 0) return <div>No data found</div>;

  return (
    <div className="">
      <div className="grid grid-row gap-4 p-10">
        {data &&
          data?.map((item: ListItemProps, i: number) => {
            return (
              <ListItem
                key={i}
                id={i}
                name={item.package.name}
                links={item.package.links}
                description={item.package.description}
                keywords={item.package.keywords}
              ></ListItem>
            );
          })}
      </div>
    </div>
  );
};

export default List;
