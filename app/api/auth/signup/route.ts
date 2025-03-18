import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function POST(req: NextRequest, res: NextResponse) {
  const { name, email, password } = signupSchema.parse(req.body);

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
