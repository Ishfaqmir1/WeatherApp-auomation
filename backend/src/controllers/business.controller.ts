import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const createBusiness = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Business name is required",
      });
    }

    const business = await prisma.business.create({
      data: {
        name,
      },
    });

    return res.status(201).json({
      message: "Business created successfully",
      business,
    });
  } catch (error) {
    console.error("Create business error:", error);

    return res.status(500).json({
      message: "Failed to create business",
    });
  }
};