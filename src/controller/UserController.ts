import { prisma } from "../utils/prisma";
import { Request, Response } from 'express';

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    return response.json({ user });
  }
};

export { UserController };
