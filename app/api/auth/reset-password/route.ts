import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { randomUUID } from "crypto"

const prisma = new PrismaClient()

// This API route is for initiating a password reset
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: "If your email exists in our system, you will receive a password reset link" },
        { status: 200 },
      )
    }

    // Delete any existing reset tokens for this user
    await prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    })

    // Create a new reset token
    const token = randomUUID()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) // Token expires in 1 hour

    // Save the reset token
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    })

    // In a real application, you would send an email with the reset link
    // For this example, we'll just return the token in the response
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`

    // Here you would send an email with the reset link
    console.log("Password reset link:", resetLink)

    return NextResponse.json(
      {
        message: "If your email exists in our system, you will receive a password reset link",
        // Only include this in development or for testing
        resetLink: process.env.NODE_ENV === "development" ? resetLink : undefined,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json({ error: "Failed to process password reset request" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
