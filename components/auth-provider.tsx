"use client";

import { useState, useEffect, ReactNode } from "react";
import { AuthContext, type AdminUser } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: adminUser } = await supabase
            .from("admin_users")
            .select("id, email, first_name, last_name")
            .eq("email", session.user.email)
            .single();

          if (adminUser) {
            setUser(adminUser);
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [supabase]);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: adminUser } = await supabase
          .from("admin_users")
          .select("id, email, first_name, last_name")
          .eq("email", email)
          .single();

        if (adminUser) {
          setUser(adminUser);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
