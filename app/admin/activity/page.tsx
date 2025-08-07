"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Activity, Clock, LogIn, LogOut, FileText, CheckCircle, Calendar, Users } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminLayout from "@/components/admin-layout"

const mockActivity = [
  {
    id: 1,
    employee: "أحمد حسن",
    employeeId: 1,
    action: "سجل دخول",
    timestamp: "2024-01-15 09:00:00",
    duration: "8 ساعات و 30 دقيقة",
    type: "login",
    details: "دخول من عنوان IP: 192.168.1.100"
  },
  {
    id: 2,
    employee: "فاطمة الزهراء",
    employeeId: 2,
    action: "أكملت مهمة",
    timestamp: "2024-01-15 14:30:00",
    task: "تصميم الصفحة الرئيسية",
    type: "task_completed",
    details: "تم إنجاز المهمة في الوقت المحدد"
  },
  {
    id: 3,
    employee: "عمر خالد",
    employeeId: 3,
    action: "رفع ملف",
    timestamp: "2024-01-15 11:15:00",
    file: "api-documentation.pdf",
    type: "file_upload",
    details: "حجم الملف: 2.4 ميجابايت"
  },
  {
    id: 4,
    employee: "نورا السالم",
    employeeId: 4,
    action: "بدأت مهمة جديدة",
    timestamp: "2024-01-15 10:00:00",
    task: "اختبار النظام الشامل",
    type: "task_started",
    details: "تم تغيير حالة المهمة إلى 'قيد التنفيذ'"
  },
  {
    id: 5,
    employee: "أحمد حسن",
    employeeId: 1,
    action: "سجل خروج",
    timestamp: "2024-01-14 17:30:00",
    duration: "8 ساعات و 30 دقيقة",
    type: "logout",
    details: "إجمالي ساعات العمل اليوم"
  },
  {
    id: 6,
    employee: "فاطمة الزهراء",
    employeeId: 2,
    action: "حدثت ملف شخصي",
    timestamp: "2024-01-14 16:45:00",
    type: "profile_update",
    details: "تم تحديث معلومات الاتصال"
  },
  {
    id: 7,
    employee: "عمر خالد",
    employeeId: 3,
    action: "رفضت مهمة",
    timestamp: "2024-01-14 15:20:00",
    task: "تحسين قاعدة البيانات",
    type: "task_rejected",
    details: "السبب: نحتاج مواصفات أكثر تفصيلاً"
  },
  {
    id: 8,
    employee: "نورا السالم",
    employeeId: 4,
    action: "أضافت تعليق",
    timestamp: "2024-01-14 13:10:00",
    task: "اختبار النظام الشامل",
    type: "comment_added",
    details: "تم إضافة ملاحظات حول التقدم"
  }
]

const todayStats = {
  totalLogins: 4,
  totalLogouts: 3,
  activeUsers: 3,
  completedTasks: 2,
  uploadedFiles: 1,
  totalWorkHours: 25.5
}

export default function ActivityPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState("all")

  const filteredActivity = mockActivity.filter(activity => {
    const matchesFilter = selectedFilter === "all" || activity.type === selectedFilter
    const matchesEmployee = selectedEmployee === "all" || activity.employeeId.toString() === selectedEmployee
    return matchesFilter && matchesEmployee
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login": return <LogIn className="h-4 w-4 text-green-600" />
      case "logout": return <LogOut className="h-4 w-4 text-red-600" />
      case "task_completed": return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "task_started": return <Clock className="h-4 w-4 text-yellow-600" />
      case "task_rejected": return <Activity className="h-4 w-4 text-red-600" />
      case "file_upload": return <FileText className="h-4 w-4 text-purple-600" />
      case "profile_update": return <Users className="h-4 w-4 text-indigo-600" />
      case "comment_added": return <Activity className="h-4 w-4 text-gray-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "login": return "bg-green-50 border-green-200"
      case "logout": return "bg-red-50 border-red-200"
      case "task_completed": return "bg-blue-50 border-blue-200"
      case "task_started": return "bg-yellow-50 border-yellow-200"
      case "task_rejected": return "bg-red-50 border-red-200"
      case "file_upload": return "bg-purple-50 border-purple-200"
      case "profile_update": return "bg-indigo-50 border-indigo-200"
      case "comment_added": return "bg-gray-50 border-gray-200"
      default: return "bg-gray-50 border-gray-200"
    }
  }

  const employees = [
    { id: 1, name: "أحمد حسن" },
    { id: 2, name: "فاطمة الزهراء" },
    { id: 3, name: "عمر خالد" },
    { id: 4, name: "نورا السالم" }
  ]

  return (
    <AdminLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            سجل النشاط
          </h1>
          <p className="text-gray-600 mt-2">تتبع جميع أنشطة الموظفين وأحداث النظام</p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">تسجيلات الدخول</CardTitle>
              <LogIn className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{todayStats.totalLogins}</div>
              <p className="text-xs text-green-600">اليوم</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">المستخدمون النشطون</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{todayStats.activeUsers}</div>
              <p className="text-xs text-blue-600">متصل الآن</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">المهام المكتملة</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{todayStats.completedTasks}</div>
              <p className="text-xs text-purple-600">اليوم</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">ساعات العمل</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{todayStats.totalWorkHours}</div>
              <p className="text-xs text-orange-600">ساعة اليوم</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">تصفية النشاط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white/80 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">جميع الأنشطة</option>
                <option value="login">تسجيل الدخول</option>
                <option value="logout">تسجيل الخروج</option>
                <option value="task_completed">إكمال المهام</option>
                <option value="task_started">بدء المهام</option>
                <option value="task_rejected">رفض المهام</option>
                <option value="file_upload">رفع الملفات</option>
                <option value="profile_update">تحديث الملف الشخصي</option>
              </select>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white/80 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">جميع الموظفين</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id.toString()}>{emp.name}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">سجل الأنشطة</CardTitle>
            <CardDescription>
              عرض {filteredActivity.length} من أصل {mockActivity.length} نشاط
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start space-x-4 space-x-reverse p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getActivityColor(activity.type)}`}
                >
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{activity.employee}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString('ar-SA')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{activity.action}</p>
                    {activity.task && (
                      <p className="text-sm text-blue-600 mt-1">المهمة: {activity.task}</p>
                    )}
                    {activity.file && (
                      <p className="text-sm text-purple-600 mt-1">الملف: {activity.file}</p>
                    )}
                    {activity.duration && (
                      <p className="text-sm text-green-600 mt-1">المدة: {activity.duration}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
