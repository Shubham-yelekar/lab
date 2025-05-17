import Link from "next/link";

import { pageLinks } from "./ui/Links";

export default function Home() {
  return (
    <div className=" flex-1">
      <div className="p-4 w-full h-16 border-b-1 border-neutral-300 flex items-center justify-center ">
        <h2 className="font-medium text-mds">All Components</h2>
      </div>
      <div className="grid grid-cols-2 p-4 md:grid-cols-4 md:p-8 gap-4">
        {pageLinks.map((page) => {
          if (page.name !== "All Components") {
            return (
              <Link
                href={page.href}
                key={`${page.name}-pageCard`}
                className="border-1 border-neutral-300 py-4 px-8 hover:bg-red-500 hover:text-neutral-100 transition-all duration-300"
              >
                {page.name}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
