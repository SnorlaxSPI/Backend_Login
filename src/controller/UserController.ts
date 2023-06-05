import { hash } from "bcryptjs";
import { prisma } from "../utils/prisma";
import { Request, Response } from 'express';

class UserController {
  async index(request:Request, response:Response) {
    const users = await prisma.user.findMany();
    
    return response.json({ users });
  }
  
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userExists = await prisma.user.findUnique({ where: { email }});

    if (userExists) {
      return response.json({ error: 'USer exists' });
    }

    const hash_password = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      },
    });

    return response.json({ user });
  }
};

export { UserController };
