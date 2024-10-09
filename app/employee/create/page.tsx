"use client";
  
import { useFormState } from "react-dom";
import { saveEmployee } from "@/lib/action";
  
const CreateEmployeePage = () => {
    const [state, formAction] = useFormState(saveEmployee, null);
    return (
    <div className="max-w-md mx-auto mt-7">
        <h1 className="text-2xl mb-8 text-white font-bold ">Add New Employee</h1>
        <div>
        <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Full Name..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Email..."
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone" className="block text-sm font-medium text-white mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Phone Number..."
          />
          <div id="phone-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
          </div>
        </div>
          
        <button className="btn btn-primary hover:text-white">Save</button>
      </form>
    </div>
    </div>
  );
};
  
export default CreateEmployeePage;