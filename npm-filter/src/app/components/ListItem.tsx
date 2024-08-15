import Link from "next/link";

interface ListItemProps {
  id: number;
  links: { npm: string };
  name: string;
  description: string;
  keywords: string[];
}

const ListItem = (item: ListItemProps) => {
  const { id, links, name, description, keywords } = item;
  return (
    <div>
      <Link
        className="hover:text-blue-600 dark:text-white dark:hover:text-sky-200 font-bold text-xl"
        key={id}
        href={links.npm}
      >
        {name}{" "}
      </Link>
      <div className="border-solid border rounded-md border-black dark:border-white dark:text-white p-2">
        {description}
      </div>
      <div className="pt-2">
        {keywords?.map((keyword) => (
          <button className="border px-2  my-2 mx-2 border-inherit rounded-lg bg-slate-200">
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListItem;
