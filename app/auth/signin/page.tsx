"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function SignInPage() {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const session = useSession();

  // Read success/error messages from URL
  useEffect(() => {
    const err = params.get("error");
    const suc = params.get("success");
    if (err) setError(err);
    if (suc) setSuccess(suc);
  }, [params]);

  // Redirect if already authenticated
  useEffect(() => {
    if (session?.status === "authenticated") {
      if (userType === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    }
  }, [session?.status, userType, router]);

  if (session.status === "loading") {
    return <p>جار التحميل...</p>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Send login request to NextAuth credentials provider
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      userType,
    });

    if (res?.error) {
      setError("بيانات الدخول غير صحيحة");
    } else {
      setError("");
      if (userType === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    }
    setIsLoading(false);
  };

  if (session.status === "unauthenticated") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 space-x-reverse text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              <Building2 className="h-8 w-8" />
              <span>العامل عن بُعد</span>
            </Link>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">
                {success || "مرحباً بعودتك"}
              </CardTitle>
              <CardDescription>سجل دخولك للوصول إلى حسابك</CardDescription>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                

                <div className="space-y-2">
                  <Label htmlFor="userType">نوع الحساب</Label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع حسابك" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">مدير الشركة</SelectItem>
                      <SelectItem value="employee">موظف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-right pl-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!userType || !email || !password || isLoading}
                >
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                  {!isLoading && <ArrowRight className="mr-2 h-4 w-4" />}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ليس لديك حساب؟{" "}
                  <Link
                    href="/auth/signup"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    إنشاء حساب جديد
                  </Link>
                </p>
              </div>

             
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
