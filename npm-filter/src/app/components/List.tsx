"use client";

import { useQuery } from "@tanstack/react-query";

import getNpmPackages from "../api/getNpmPackages";
import ListItem from "./ListItem";
import Loading from "../loading";

const List = (ListProps: { filter: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getNpmPackages(ListProps.filter as string),
    queryKey: ["npm", ListProps.filter], //Array according to Documentation,
    enabled: ListProps.filter !== "",
  });
  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry There was an Error</div>;
  if (data?.lenght === 0) return <div>No data</div>;

  return (
    <div className="w-96">
      <div className="grid grid-row gap-4 p-10">
        {data &&
          data?.map(
            (
              item: {
                package: {
                  name: string;
                  description: string;
                  links: { npm: string };
                };
              },
              i: number
            ) => {
              return (
                <ListItem
                  key={i}
                  name={item.package.name}
                  links={item.package.links}
                  description={item.package.description}
                ></ListItem>
              );
            }
          )}
      </div>
    </div>
  );
};

export default List;
