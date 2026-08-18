import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const createCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, phone, email, businessId } = req.body;

    if (!name || !phone || !businessId) {
      return res.status(400).json({
        message: "name, phone and businessId are required",
      });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        businessId,
      },
    });

    return res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    console.error("Create customer error:", error);

    return res.status(500).json({
      message: "Failed to create customer",
    });
  }
};

export const getCustomers = async (
  req: Request,
  res: Response
) => {
  try {
    const { businessId } = req.params;

    const customers = await prisma.customer.findMany({
      where: {
        businessId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      customers,
    });
  } catch (error) {
    console.error("Get customers error:", error);

    return res.status(500).json({
      message: "Failed to get customers",
    });
  }
};