import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Hello World", users });
});

export default router;