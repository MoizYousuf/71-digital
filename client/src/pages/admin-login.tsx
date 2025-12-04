import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { adminLoginSchema, type AdminLoginData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Lock, Shield } from "lucide-react";

export default function AdminLogin() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: AdminLoginData) => {
      const res = await apiRequest("POST", "/api/admin/login", credentials);
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("adminToken", data.sessionToken);
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        setLocation("/admin/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AdminLoginData) => {
    loginMutation.mutate(data);
  };

  const adminLoginPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Admin Login - 71 Digital Management Portal",
    "description": "Secure admin login portal for 71 Digital Bitcoin mining operations management. Access contact submissions, appointments, and admin controls.",
    "url": "https://71digital.io/admin-login"
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #1A0F08 0%, #2D1810 50%, #1A0F08 100%)"
      }}
    >
      <SEOHead
        title="Admin Login - 71 Digital Management Portal | Secure Access"
        description="Secure admin login portal for 71 Digital Bitcoin mining operations management. Access contact submissions, appointment bookings, and administrative controls."
        canonical="https://71digital.io/admin-login"
        schema={adminLoginPageSchema}
      />
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-orange-500/30">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              71 Digital Admin
            </CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to access the admin dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}