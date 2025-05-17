import Image from "next/image";
import Link from "next/link";

import { pageLinks } from "./ui/Links";

export default function Home() {
  return (
    <div className=" flex-1">
      <div className="p-4 w-full h-16 border-b-1 border-neutral-300 flex items-center justify-center ">
        <h2 className="font-medium text-mds">All Components</h2>
      </div>
      <div className="grid grid-cols-4 p-8">
        {pageLinks.map((page, id) => {
          if (page.name !== "All Components") {
            return (
              <Link href={page.href} key={`${page.name}-pageCard`} className="">
                {page.name}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
