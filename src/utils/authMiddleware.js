import NewUser from "@/models/NewUser";
import jwt from "jsonwebtoken";

export async function authMiddleware(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return { error: "No token provided", status: 401 };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const user = await NewUser.findById(decoded.userId).select("-password");

    if (!user) {
      return { error: "User not found", status: 401 };
    }

    return { user };
  } catch (error) {
    return { error: "Invalid token", status: 401 };
  }
}

export const requireAuth = (handler) => {
  return async (req) => {
    const authResult = await authMiddleware(req);

    if (authResult.error) {
      return new Response(JSON.stringify({ message: authResult.error }), {
        status: authResult.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Add user to request object
    req.user = authResult.user;
    return handler(req);
  };
};

export const requireAdmin = (handler) => {
  return async (req) => {
    const authResult = await authMiddleware(req);

    if (authResult.error) {
      return new Response(JSON.stringify({ message: authResult.error }), {
        status: authResult.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (authResult.user.role !== "admin") {
      return new Response(
        JSON.stringify({ message: "Admin access required" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add user to request object
    req.user = authResult.user;
    return handler(req);
  };
};
