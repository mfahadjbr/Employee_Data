import UpdateForm from "@/app/components/editform";
import { getEmployeeById } from "@/lib/action";
import { notFound } from "next/navigation";
  
const UpdateEmployeePage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const employee = await getEmployeeById(id);
    //console.log(employee);
  
    if (!employee) {
        notFound();
    }
  
    return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl mb-8 text-gray-400 font-bold">Update Employee</h1>
        <UpdateForm employee={employee} />
    </div>
  );
};
  
export default UpdateEmployeePage;