import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";

const prisma = new PrismaClient();

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async createUser(name: string, email: string): Promise<User> {
    return prisma.user.create({
      data: { name, email }
    });
  }

  async updateUser(id: number, name: string, email: string): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data: { name, email }
    });
  }

  async deleteUser(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}
