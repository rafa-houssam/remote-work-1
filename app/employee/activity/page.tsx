"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, LogIn, LogOut } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmployeeLayout from "@/components/employee-layout"

const mockActivity = [
  {
    date: "2024-01-15",
    loginTime: "09:00:00",
    logoutTime: "17:30:00",
    totalHours: "8 ساعات و 30 دقيقة",
    status: "مكتمل",
    breaks: "30 دقيقة"
  },
  {
    date: "2024-01-14",
    loginTime: "09:15:00",
    logoutTime: "17:45:00",
    totalHours: "8 ساعات و 30 دقيقة",
    status: "مكتمل",
    breaks: "45 دقيقة"
  },
  {
    date: "2024-01-13",
    loginTime: "09:30:00",
    logoutTime: "16:00:00",
    totalHours: "6 ساعات و 30 دقيقة",
    status: "انصراف مبكر",
    breaks: "15 دقيقة"
  },
  {
    date: "2024-01-12",
    loginTime: "08:45:00",
    logoutTime: "18:00:00",
    totalHours: "9 ساعات و 15 دقيقة",
    status: "ساعات إضافية",
    breaks: "60 دقيقة"
  },
  {
    date: "2024-01-11",
    loginTime: "09:00:00",
    logoutTime: "17:30:00",
    totalHours: "8 ساعات و 30 دقيقة",
    status: "مكتمل",
    breaks: "30 دقيقة"
  }
]

const weeklyStats = {
  totalHours: "40 ساعة و 45 دقيقة",
  averageDaily: "8 ساعات و 9 دقائق",
  onTimeLogins: 4,
  totalDays: 5
}

export default function ActivityPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل": return "bg-green-100 text-green-800"
      case "انصراف مبكر": return "bg-yellow-100 text-yellow-800"
      case "ساعات إضافية": return "bg-blue-100 text-blue-800"
      case "غياب": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">سجل النشاط</h1>
          <p className="text-gray-600">تتبع ساعات العمل والحضور اليومي</p>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الساعات</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.totalHours}</div>
              <p className="text-xs text-blue-100">هذا الأسبوع</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المعدل اليومي</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.averageDaily}</div>
              <p className="text-xs text-green-100">متوسط يومي</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الحضور في الوقت</CardTitle>
              <LogIn className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.onTimeLogins}/{weeklyStats.totalDays}</div>
              <p className="text-xs text-purple-100">أيام هذا الأسبوع</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل الأداء</CardTitle>
              <LogOut className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-orange-100">هذا الشهر</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>سجل الحضور والانصراف</CardTitle>
            <CardDescription>تفاصيل ساعات العمل اليومية</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">وقت الدخول</TableHead>
                  <TableHead className="text-right">وقت الخروج</TableHead>
                  <TableHead className="text-right">إجمالي الساعات</TableHead>
                  <TableHead className="text-right">فترات الراحة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockActivity.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(activity.date).toLocaleDateString('ar-SA', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <LogIn className="h-4 w-4 text-green-600" />
                        <span>{activity.loginTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <LogOut className="h-4 w-4 text-red-600" />
                        <span>{activity.logoutTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{activity.totalHours}</TableCell>
                    <TableCell>{activity.breaks}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle>الحالة الحالية</CardTitle>
            <CardDescription>معلومات جلسة العمل الحالية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <LogIn className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">وقت الدخول اليوم</p>
                <p className="text-lg font-bold text-green-900">09:00:00</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-800">ساعات العمل حتى الآن</p>
                <p className="text-lg font-bold text-blue-900">6 ساعات و 15 دقيقة</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-800">الحالة</p>
                <p className="text-lg font-bold text-purple-900">نشط</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  )
}
