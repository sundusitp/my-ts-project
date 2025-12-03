import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { log } from "../utils/logger";

const userService = new UserService();

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    log("Returned all users");
    res.json(users);
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  static async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const user = await userService.createUser(name, email);
    res.status(201).json(user);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    try {
      const user = await userService.updateUser(id, name, email);
      res.json(user);
    } catch {
      res.status(404).json({ message: "User not found" });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await userService.deleteUser(id);
      res.json({ message: `Deleted user ${user?.id}` });
    } catch {
      res.status(404).json({ message: "User not found" });
    }
  }
}
