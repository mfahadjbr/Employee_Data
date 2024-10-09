'use client';
import { deleteEmployee } from "@/lib/action";

export const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    await deleteEmployee(id);
  };

  return (
    <form>
      <button className="btn btn-error" onClick={handleDelete}>
        Delete
      </button>
    </form>
  );
};