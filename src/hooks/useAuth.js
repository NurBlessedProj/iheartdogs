import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);

      // Check for admin token
      const adminToken = localStorage.getItem("adminToken");
      const authToken = localStorage.getItem("authToken");

      if (adminToken) {
        // Verify admin token is still valid
        const response = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
          setUser({ role: "admin", token: adminToken });
        } else {
          // Token is invalid, remove it
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
          setUser(null);
        }
      } else if (authToken) {
        // Check regular user token
        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUser({ ...userData, token: authToken });
        } else {
          // Token is invalid, remove it
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials, isAdmin = false) => {
    try {
      setIsLoading(true);

      const endpoint = isAdmin ? "/api/admin/login" : "/api/auth/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        const tokenKey = isAdmin ? "adminToken" : "authToken";
        localStorage.setItem(tokenKey, data.token || "authenticated");

        setIsAuthenticated(true);
        setUser({
          ...data.user,
          role: isAdmin ? "admin" : "user",
          token: data.token || "authenticated",
        });

        return { success: true, data };
      } else {
        return { success: false, error: data.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear all tokens
    localStorage.removeItem("adminToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("selectedPuppy");
    localStorage.removeItem("orders");

    setIsAuthenticated(false);
    setUser(null);

    // Redirect to home page
    router.push("/");
  }, [router]);

  const requireAuth = useCallback(
    (redirectTo = "/admin/login", isAdmin = true) => {
      if (!isLoading && !isAuthenticated) {
        router.push(redirectTo);
        return false;
      }

      if (!isLoading && isAuthenticated && isAdmin && user?.role !== "admin") {
        router.push("/");
        return false;
      }

      return isAuthenticated;
    },
    [isLoading, isAuthenticated, user, router]
  );

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    requireAuth,
    checkAuthStatus,
  };
};
