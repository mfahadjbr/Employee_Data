"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const EmployeeSchema = z.object({
  name: z.string().min(6),
  email: z.string().min(6),
  phone: z.string().min(11),
});

// Updated types and removed 'any'
export const saveEmployee = async (
  prevState: Record<string, unknown> | null, // More specific than 'any'
  formData: FormData
) => {
  const validatedFields = EmployeeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.employee.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
      },
    });
  } catch {
    return { message: "Failed to create new employee" }; // Removed 'error' as it's not used
  }

  revalidatePath("/employee");
  redirect("/employee");
};

export const getEmployeelist = async () => {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return employees;
  } catch {
    throw new Error("Failed to fetch employees data"); // Removed 'error' variable
  }
};

export const getData = async (query: string) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return employees;
  } catch {
    throw new Error("Failed to fetch employees data"); // Removed 'error' variable
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    return employee;
  } catch {
    throw new Error("Failed to fetch employee data"); // Removed 'error' variable
  }
};

export const updateEmployee = async (
  id: string,
  prevState: Record<string, unknown> | null, // More specific type
  formData: FormData
) => {
  const validatedFields = EmployeeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.employee.update({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
      },
      where: { id },
    });
  } catch {
    return { message: "Failed to update employee" }; // Removed 'error' variable
  }

  revalidatePath("/employee");
  redirect("/employee");
};

export const deleteEmployee = async (id: string) => {
  try {
    await prisma.employee.delete({
      where: { id },
    });
  } catch {
    return { message: "Failed to delete employee" }; // Removed 'error' variable
  }

  revalidatePath("/employee");
};
