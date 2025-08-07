"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, CheckCircle, Clock, XCircle, FileText, Activity, Building2, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminLayout from "@/components/admin-layout"
import CreateTaskDialog from "@/components/create-task-dialog"
import CreateEmployeeDialog from "@/components/create-employee-dialog"

// Mock data
const mockEmployees = [
  {
    id: 1,
    name: "أحمد حسن",
    email: "ahmed@company.com",
    role: "مطور واجهات أمامية",
    status: "متصل",
    lastActive: "منذ دقيقتين",
    tasksCompleted: 12,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    name: "فاطمة الزهراء",
    email: "fatima@company.com",
    role: "مصممة واجهات",
    status: "غير متصل",
    lastActive: "منذ ساعة",
    tasksCompleted: 8,
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    name: "عمر خالد",
    email: "omar@company.com",
    role: "مطور خلفية",
    status: "متصل",
    lastActive: "منذ 5 دقائق",
    tasksCompleted: 15,
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

const mockTasks = [
  {
    id: 1,
    title: "تصميم الصفحة الرئيسية",
    assignedTo: "فاطمة الزهراء",
    status: "مكتملة",
    priority: "عالية",
    dueDate: "2024-01-15",
    description: "إنشاء تصميم عصري للصفحة الرئيسية"
  },
  {
    id: 2,
    title: "تطوير واجهة برمجة التطبيقات",
    assignedTo: "عمر خالد",
    status: "قيد التنفيذ",
    priority: "متوسطة",
    dueDate: "2024-01-20",
    description: "تطوير واجهة برمجة تطبيقات الدفع"
  },
  {
    id: 3,
    title: "تحسين الاستجابة للهواتف",
    assignedTo: "أحمد حسن",
    status: "مُعيّنة",
    priority: "عالية",
    dueDate: "2024-01-18",
    description: "جعل الموقع متجاوب مع الهواتف المحمولة"
  },
  {
    id: 4,
    title: "تحسين قاعدة البيانات",
    assignedTo: "عمر خالد",
    status: "مرفوضة",
    priority: "منخفضة",
    dueDate: "2024-01-25",
    description: "تحسين استعلامات قاعدة البيانات",
    refusalReason: "نحتاج مواصفات أكثر تفصيلاً"
  }
]

const mockActivity = [
  {
    id: 1,
    employee: "أحمد حسن",
    action: "سجل دخول",
    timestamp: "2024-01-15 09:00:00",
    duration: "8 ساعات و 30 دقيقة"
  },
  {
    id: 2,
    employee: "فاطمة الزهراء",
    action: "أكملت مهمة",
    timestamp: "2024-01-15 14:30:00",
    task: "تصميم الصفحة الرئيسية"
  },
  {
    id: 3,
    employee: "عمر خالد",
    action: "رفع ملف",
    timestamp: "2024-01-15 11:15:00",
    file: "api-documentation.pdf"
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showCreateEmployee, setShowCreateEmployee] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتملة": return "bg-green-100 text-green-800"
      case "قيد التنفيذ": return "bg-blue-100 text-blue-800"
      case "مُعيّنة": return "bg-yellow-100 text-yellow-800"
      case "مرفوضة": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية": return "bg-red-100 text-red-800"
      case "متوسطة": return "bg-yellow-100 text-yellow-800"
      case "منخفضة": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المدير</h1>
            <p className="text-gray-600">إدارة فريقك عن بُعد وتتبع التقدم</p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Button 
              onClick={() => setShowCreateEmployee(true)}
              variant="outline"
              className="font-medium"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة موظف
            </Button>
            <Button 
              onClick={() => setShowCreateTask(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة مهمة
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEmployees.length}</div>
              <p className="text-xs text-blue-100">
                {mockEmployees.filter(e => e.status === 'متصل').length} متصل الآن
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المهام المكتملة</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTasks.filter(t => t.status === 'مكتملة').length}
              </div>
              <p className="text-xs text-green-100">
                +2 من الأمس
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المهام المعلقة</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTasks.filter(t => t.status === 'مُعيّنة' || t.status === 'قيد التنفيذ').length}
              </div>
              <p className="text-xs text-yellow-100">
                2 مستحقة اليوم
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ساعات العمل النشطة</CardTitle>
              <Activity className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5 ساعة</div>
              <p className="text-xs text-purple-100">
                إجمالي اليوم
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="employees">الموظفون</TabsTrigger>
            <TabsTrigger value="tasks">المهام</TabsTrigger>
            <TabsTrigger value="activity">النشاط</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>المهام الأخيرة</CardTitle>
                  <CardDescription>آخر تحديثات المهام من فريقك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.assignedTo}</p>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Team Status */}
              <Card>
                <CardHeader>
                  <CardTitle>حالة الفريق</CardTitle>
                  <CardDescription>الحالة الحالية لأعضاء فريقك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-3 space-x-reverse">
                      <Avatar>
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.role}</p>
                      </div>
                      <div className="text-left">
                        <Badge variant={employee.status === 'متصل' ? 'default' : 'secondary'}>
                          {employee.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{employee.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الموظفين</CardTitle>
                <CardDescription>إدارة أعضاء فريقك وصلاحياتهم</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الموظف</TableHead>
                      <TableHead className="text-right">الدور</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">المهام المكتملة</TableHead>
                      <TableHead className="text-right">آخر نشاط</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="flex items-center space-x-3 space-x-reverse">
                          <Avatar>
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-600">{employee.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>
                          <Badge variant={employee.status === 'متصل' ? 'default' : 'secondary'}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.tasksCompleted}</TableCell>
                        <TableCell>{employee.lastActive}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المهام</CardTitle>
                <CardDescription>مراقبة وإدارة جميع المهام المُعيّنة لفريقك</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">المهمة</TableHead>
                      <TableHead className="text-right">مُعيّنة إلى</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الأولوية</TableHead>
                      <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            {task.refusalReason && (
                              <p className="text-sm text-red-600 mt-1">السبب: {task.refusalReason}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>سجل النشاط</CardTitle>
                <CardDescription>تتبع جميع أنشطة الموظفين وأحداث النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.employee}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        {activity.task && (
                          <p className="text-sm text-blue-600">المهمة: {activity.task}</p>
                        )}
                        {activity.file && (
                          <p className="text-sm text-green-600">الملف: {activity.file}</p>
                        )}
                        {activity.duration && (
                          <p className="text-sm text-purple-600">المدة: {activity.duration}</p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString('ar-SA')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <CreateTaskDialog 
          open={showCreateTask} 
          onOpenChange={setShowCreateTask}
          employees={mockEmployees}
        />
        <CreateEmployeeDialog 
          open={showCreateEmployee} 
          onOpenChange={setShowCreateEmployee}
        />
      </div>
    </AdminLayout>
  )
}
