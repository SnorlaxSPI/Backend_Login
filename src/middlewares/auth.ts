import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayLoad = {
  id: string;
  iat: number;
  exp: number;
}

export function AuthMiddlewares (
request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [, token ] = authorization.split(' ');

  try {
    const decoded = verify(token, 'secret');
    const { id } = decoded as TokenPayLoad;

    request.userId = id;
    next();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' });
  }
}
