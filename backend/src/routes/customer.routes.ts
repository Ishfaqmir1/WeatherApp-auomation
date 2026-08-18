import { Router } from "express";
import {
  createCustomer,
  getCustomers,
} from "../controllers/customer.controller.js";

const router = Router();

router.post("/", createCustomer);

router.get("/:businessId", getCustomers);

export default router;