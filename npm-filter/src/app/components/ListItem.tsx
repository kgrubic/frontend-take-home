import Link from "next/link";

const ListItem = (item: {
  links: { npm: string };
  description: string;
  name: string;
  key: number;
}) => {
  return (
    <div>
      <Link
        className="hover:text-blue-600 dark:text-white dark:hover:text-sky-200"
        key={item.key}
        href={item.links.npm}
      >
        {item.name}{" "}
      </Link>
      <div className="border-solid border rounded-md border-black dark:border-white dark:text-white p-2">
        {item.description}
      </div>
    </div>
  );
};

export default ListItem;
