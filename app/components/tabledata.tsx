import Link from "next/link";
import { getData } from "@/lib/action";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/app/components/delete";

// Define the expected employee type
type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
};

const Employee = async ({
  query,
}: {
  query: string;
}) => {
  // Fetch employees based on the query
  const employees: Employee[] = await getData(query);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto text-sm text-left text-gray-500">
        <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Phone Number</th>
            <th className="py-3 px-4">Created At</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((rs, index) => (
            <tr key={rs.id}>
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{rs.name}</td>
              <td className="py-3 px-4">{rs.email}</td>
              <td className="py-3 px-4">{rs.phone}</td>
              <td className="py-3 px-4">
                {formatDate(rs.createdAt.toString())}
              </td>
              <td className="py-3 px-4 flex justify-center gap-2">
                <Link
                  href={`/employee/edit/${rs.id}`}
                  className="btn btn-info text-xs md:text-sm"
                >
                  Edit
                </Link>
                <DeleteButton id={rs.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
