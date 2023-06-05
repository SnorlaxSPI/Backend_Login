import { Request, Response } from 'express';
import { compare } from "bcryptjs";
import { prisma } from "../utils/prisma";
import { sign } from "jsonwebtoken";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({where: { email } });

    if (!user) {
      return response.json({ error: 'User not found' });
    }

    const isValuePassword = await compare(password, user.password );

    if (!isValuePassword) {
      return response.json({ error: 'password invalid' });
    }

    const token = sign({ id: user.id }, "secret", { expiresIn: '1d' });

    const { id } = user;

    return response.json({ user: { id, email }, token });
  }
};

export { AuthController };
