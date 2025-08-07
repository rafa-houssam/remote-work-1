"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, FileText, Play, Pause, Calendar, User, Upload } from 'lucide-react'
import EmployeeLayout from "@/components/employee-layout"

// Mock data for employee
const mockEmployee = {
  name: "أحمد حسن",
  email: "ahmed@company.com",
  role: "مطور واجهات أمامية",
  joinDate: "2023-06-15",
  totalTasks: 25,
  completedTasks: 18
}

const mockTasks = [
  {
    id: 1,
    title: "تحسين الاستجابة للهواتف",
    description: "جعل الموقع متجاوب مع جميع أحجام الشاشات",
    status: "مُعيّنة",
    priority: "عالية",
    dueDate: "2024-01-18",
    assignedBy: "سارة المدير",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "إصلاح خطأ في القائمة",
    description: "حل مشكلة قائمة التنقل في الهواتف المحمولة",
    status: "قيد التنفيذ",
    priority: "متوسطة",
    dueDate: "2024-01-20",
    assignedBy: "سارة المدير",
    createdAt: "2024-01-14"
  },
  {
    id: 3,
    title: "تحديث صفحة الملف الشخصي",
    description: "تطبيق التصميم الجديد لصفحة الملف الشخصي",
    status: "مكتملة",
    priority: "منخفضة",
    dueDate: "2024-01-12",
    assignedBy: "سارة المدير",
    createdAt: "2024-01-10"
  }
]

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("tasks")
  const [isWorking, setIsWorking] = useState(false)
  const [workStartTime, setWorkStartTime] = useState<Date | null>(null)

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

  const handleStartWork = () => {
    setIsWorking(true)
    setWorkStartTime(new Date())
  }

  const handleStopWork = () => {
    setIsWorking(false)
    setWorkStartTime(null)
  }

  const handleTaskStatusChange = (taskId: number, newStatus: string) => {
    console.log(`Task ${taskId} status changed to ${newStatus}`)
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مرحباً بعودتك، {mockEmployee.name}!</h1>
            <p className="text-gray-600">تتبع مهامك وأدر عملك بكفاءة</p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            {!isWorking ? (
              <Button onClick={handleStartWork} className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 ml-2" />
                بدء العمل
              </Button>
            ) : (
              <Button onClick={handleStopWork} variant="destructive">
                <Pause className="h-4 w-4 ml-2" />
                إيقاف العمل
              </Button>
            )}
            {isWorking && workStartTime && (
              <div className="text-sm text-gray-600">
                العمل منذ: {workStartTime.toLocaleTimeString('ar-SA')}
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المهام</CardTitle>
              <FileText className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEmployee.totalTasks}</div>
              <p className="text-xs text-blue-100">
                جميع المهام المُعيّنة
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">مكتملة</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEmployee.completedTasks}</div>
              <p className="text-xs text-green-100">
                {Math.round((mockEmployee.completedTasks / mockEmployee.totalTasks) * 100)}% معدل الإنجاز
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معلقة</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTasks.filter(t => t.status === 'مُعيّنة' || t.status === 'قيد التنفيذ').length}
              </div>
              <p className="text-xs text-yellow-100">
                مهام نشطة
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">هذا الأسبوع</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32 ساعة</div>
              <p className="text-xs text-purple-100">
                ساعات العمل
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>مهامي</CardTitle>
              <CardDescription>إدارة المهام المُعيّنة لك وتحديث حالتها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTasks.map((task) => (
                  <Card key={task.id} className="border-r-4 border-r-blue-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <CardDescription>{task.description}</CardDescription>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                            <span>مُعيّنة من: {task.assignedBy}</span>
                            <span>الاستحقاق: {task.dueDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2 space-x-reverse">
                        {task.status === 'مُعيّنة' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleTaskStatusChange(task.id, 'قيد التنفيذ')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            بدء العمل
                          </Button>
                        )}
                        {task.status === 'قيد التنفيذ' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleTaskStatusChange(task.id, 'مكتملة')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              تم الإنجاز
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleTaskStatusChange(task.id, 'مرفوضة')}
                            >
                              رفض المهمة
                            </Button>
                          </>
                        )}
                        {task.status === 'مكتملة' && (
                          <Badge className="bg-green-100 text-green-800">
                            ✓ مكتملة
                          </Badge>
                        )}
                      </div>
                      {task.status === 'قيد التنفيذ' && (
                        <div className="mt-4 space-y-2">
                          <Label htmlFor="progress-note">ملاحظة التقدم</Label>
                          <Textarea 
                            id="progress-note"
                            placeholder="أضف ملاحظة حول تقدمك في المهمة..."
                            className="min-h-[80px] text-right"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EmployeeLayout>
  )
}
