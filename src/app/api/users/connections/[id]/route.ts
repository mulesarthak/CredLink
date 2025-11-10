import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// PATCH - Accept or reject connection request
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get("user_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const params = await context.params;
    const requestId = params.id;
    const { action } = await req.json(); // "accept" or "reject"

    if (!["accept", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use 'accept' or 'reject'" },
        { status: 400 }
      );
    }

    // Find the connection request
    const connectionRequest = await prisma.connections.findUnique({
      where: { id: requestId },
    });

    if (!connectionRequest) {
      return NextResponse.json(
        { error: "Connection request not found" },
        { status: 404 }
      );
    }

    // Only receiver can accept/reject
    if (connectionRequest.receiverId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to modify this request" },
        { status: 403 }
      );
    }

    // Update the request status
    const updatedRequest = await prisma.connections.update({
      where: { id: requestId },
      data: {
        status: action === "accept" ? "ACCEPTED" : "REJECTED",
      },
    });

    // If accepted, add to both users' connections arrays
    if (action === "accept") {
      const senderId = connectionRequest.senderId;
      const receiverId = connectionRequest.receiverId;

      // Update sender's connections
      await prisma.$executeRaw`
        UPDATE users 
        SET connections = JSON_ARRAY_APPEND(
          COALESCE(connections, '[]'), 
          '$', 
          ${receiverId}
        )
        WHERE id = ${senderId}
        AND NOT JSON_CONTAINS(COALESCE(connections, '[]'), JSON_QUOTE(${receiverId}))
      `;

      // Update receiver's connections
      await prisma.$executeRaw`
        UPDATE users 
        SET connections = JSON_ARRAY_APPEND(
          COALESCE(connections, '[]'), 
          '$', 
          ${senderId}
        )
        WHERE id = ${receiverId}
        AND NOT JSON_CONTAINS(COALESCE(connections, '[]'), JSON_QUOTE(${senderId}))
      `;
    }

    return NextResponse.json({
      message: `Connection request ${action}ed`,
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating connection request:", error);
    return NextResponse.json(
      { error: "Failed to update connection request" },
      { status: 500 }
    );
  }
}

// DELETE - Remove connection (for accepted connections or cancel pending)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get("user_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const params = await context.params;
    const requestId = params.id;

    // Find the connection request
    const connectionRequest = await prisma.connections.findUnique({
      where: { id: requestId },
    });

    if (!connectionRequest) {
      return NextResponse.json(
        { error: "Connection not found" },
        { status: 404 }
      );
    }

    // Only involved users can remove connection
    if (
      connectionRequest.senderId !== userId &&
      connectionRequest.receiverId !== userId
    ) {
      return NextResponse.json(
        { error: "Unauthorized to remove this connection" },
        { status: 403 }
      );
    }

    const senderId = connectionRequest.senderId;
    const receiverId = connectionRequest.receiverId;

    // Remove from both users' connections arrays if accepted
    if (connectionRequest.status === "ACCEPTED") {
      // Remove receiver from sender's connections
      await prisma.$executeRaw`
        UPDATE users 
        SET connections = JSON_REMOVE(
          connections,
          JSON_UNQUOTE(JSON_SEARCH(connections, 'one', ${receiverId}))
        )
        WHERE id = ${senderId}
        AND JSON_CONTAINS(connections, JSON_QUOTE(${receiverId}))
      `;

      // Remove sender from receiver's connections
      await prisma.$executeRaw`
        UPDATE users 
        SET connections = JSON_REMOVE(
          connections,
          JSON_UNQUOTE(JSON_SEARCH(connections, 'one', ${senderId}))
        )
        WHERE id = ${receiverId}
        AND JSON_CONTAINS(connections, JSON_QUOTE(${senderId}))
      `;
    }

    // Delete the connection request
    await prisma.connections.delete({
      where: { id: requestId },
    });

    return NextResponse.json({
      message: "Connection removed successfully",
    });
  } catch (error) {
    console.error("Error removing connection:", error);
    return NextResponse.json(
      { error: "Failed to remove connection" },
      { status: 500 }
    );
  }
}
