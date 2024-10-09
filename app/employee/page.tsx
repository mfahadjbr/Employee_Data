import Link from "next/link";
import TableData from "@/app/components/tabledata";
import { Suspense } from "react";
import { Spinner } from "@/app/components/spinner";

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";

  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center px-4">
      <div className="flex items-center justify-between gap-1 mb-5 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center md:text-left">
        Next.js 14 CRUD Employee Form with Prisma Mysql
        </h1>
      </div>

      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-4">
          <Link href="/employee/create" className="btn btn-primary w-full md:w-1/3 lg:w-1/4 text-center text-xl font-semibold">
            Create Employee
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <Suspense key={query} fallback={<Spinner />}>
            <TableData query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
