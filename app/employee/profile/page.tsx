"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X } from "lucide-react";
import EmployeeLayout from "@/components/employee-layout";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState<any>(null);
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0 });
  const [formData, setFormData] = useState({
    phoneNumber: "",
    geoPosition: "",
    bio: "",
  });

  // prevent re-fetch overwriting edited values
  const fetchedOnce = useRef(false);

  const fetchUserAndStats = async () => {
    try {
      // Get user by session
      const res = await fetch("/api/auth/user/by-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
        }),
      });

      const userData = await res.json();

      if (!userData?._id) {
        console.error("المستخدم غير موجود في قاعدة البيانات");
        return;
      }

      setEmployee(userData);

      // set form data only on first load
      if (!fetchedOnce.current) {
        setFormData({
          phoneNumber: userData.phoneNumber || "",
          geoPosition: userData.geoPosition || "",
          bio: userData.bio || "",
        });
        fetchedOnce.current = true;
      }

      // Fetch tasks for stats
      const tasksRes = await fetch(`/api/employee/${userData._id}/tasks`);
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        const total = tasksData.length;
        const completed = tasksData.filter((t: any) => t.status === "done").length;
        setStats({
          totalTasks: total,
          completedTasks: completed,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email || !session?.user?.name) return;
    fetchUserAndStats();
  }, [session, status]);

  const handleSave = async () => {
    const res = await fetch(`/api/employee/${employee._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      toast.error("حدث خطأ أثناء تحديث الملف الشخصي ❌");
      return;
    }

    toast.success("تم تحديث الملف الشخصي بنجاح ✅");

    await fetchUserAndStats();
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!employee) return;
    setFormData({
      phoneNumber: employee.phoneNumber || "",
      geoPosition: employee.geoPosition || "",
      bio: employee.bio || "",
    });
    setIsEditing(false);
  };

  if (status === "loading") return <p>جارٍ التحميل...</p>;
  if (!employee) return <p>لم يتم العثور على بيانات الموظف</p>;

  return (
    <EmployeeLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
            <p className="text-gray-600">عرض وتحديث معلوماتك الشخصية</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 ml-2" />
              تعديل الملف
            </Button>
          ) : (
            <div className="flex space-x-2 space-x-reverse">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 ml-2" />
                إلغاء
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأساسية</CardTitle>
                <CardDescription>معلوماتك الشخصية والمهنية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6 space-x-reverse">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={employee.avatar || ""} alt={employee.name} />
                    <AvatarFallback className="text-2xl">
                      {employee.name?.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{employee.name}</h2>
                    <p className="text-gray-600">{employee.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name (read-only) */}
                  <div className="space-y-2">
                    <Label>الاسم الكامل</Label>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{employee.name}</span>
                    </div>
                  </div>

                  {/* Email (read-only) */}
                  <div className="space-y-2">
                    <Label>البريد الإلكتروني</Label>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{employee.email}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                        }
                        className="text-right"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{employee.phoneNumber}</span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={formData.geoPosition}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, geoPosition: e.target.value }))
                        }
                        className="text-right"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{employee.geoPosition}</span>
                      </div>
                    )}
                  </div>

                  {/* Join Date */}
                  <div className="space-y-2">
                    <Label>تاريخ الانضمام</Label>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(employee.dateOfJoining).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label>المسمى الوظيفي</Label>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{employee.role}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                      className="text-right min-h-[100px]"
                      placeholder="اكتب نبذة مختصرة عنك..."
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded text-gray-700 leading-relaxed">
                      {employee.bio}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الأداء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalTasks}</div>
                  <p className="text-sm text-blue-800">إجمالي المهام</p>
                </div>
                <div className="text-center p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
                  <p className="text-sm text-green-800">مهام مكتملة</p>
                </div>
                <div className="text-center p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.totalTasks > 0
                      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
                      : 0}%
                  </div>
                  <p className="text-sm text-purple-800">معدل الإنجاز</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}
