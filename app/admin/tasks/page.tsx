"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckSquare, Search, Plus, Edit, Trash2, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminLayout from "@/components/admin-layout"
import CreateTaskDialog from "@/components/create-task-dialog"

const mockTasks = [
  {
    id: 1,
    title: "تصميم الصفحة الرئيسية",
    assignedTo: "فاطمة الزهراء",
    assignedToId: 2,
    status: "مكتملة",
    priority: "عالية",
    dueDate: "2024-01-15",
    createdDate: "2024-01-10",
    description: "إنشاء تصميم عصري للصفحة الرئيسية مع التركيز على تجربة المستخدم",
    category: "التصميم",
    estimatedHours: 16,
    actualHours: 14
  },
  {
    id: 2,
    title: "تطوير واجهة برمجة التطبيقات",
    assignedTo: "عمر خالد",
    assignedToId: 3,
    status: "قيد التنفيذ",
    priority: "متوسطة",
    dueDate: "2024-01-20",
    createdDate: "2024-01-12",
    description: "تطوير واجهة برمجة تطبيقات الدفع مع التكامل مع البوابات المختلفة",
    category: "التطوير",
    estimatedHours: 24,
    actualHours: 12
  },
  {
    id: 3,
    title: "تحسين الاستجابة للهواتف",
    assignedTo: "أحمد حسن",
    assignedToId: 1,
    status: "مُعيّنة",
    priority: "عالية",
    dueDate: "2024-01-18",
    createdDate: "2024-01-14",
    description: "جعل الموقع متجاوب مع جميع أحجام الشاشات والأجهزة المحمولة",
    category: "التطوير",
    estimatedHours: 20,
    actualHours: 0
  },
  {
    id: 4,
    title: "تحسين قاعدة البيانات",
    assignedTo: "عمر خالد",
    assignedToId: 3,
    status: "مرفوضة",
    priority: "منخفضة",
    dueDate: "2024-01-25",
    createdDate: "2024-01-13",
    description: "تحسين استعلامات قاعدة البيانات وتحسين الأداء",
    category: "التطوير",
    refusalReason: "نحتاج مواصفات أكثر تفصيلاً",
    estimatedHours: 12,
    actualHours: 0
  },
  {
    id: 5,
    title: "اختبار النظام الشامل",
    assignedTo: "نورا السالم",
    assignedToId: 4,
    status: "قيد التنفيذ",
    priority: "عالية",
    dueDate: "2024-01-22",
    createdDate: "2024-01-15",
    description: "إجراء اختبارات شاملة للنظام والتأكد من جودة الأداء",
    category: "الاختبار",
    estimatedHours: 30,
    actualHours: 8
  }
]

const mockEmployees = [
  { id: 1, name: "أحمد حسن", role: "مطور واجهات أمامية" },
  { id: 2, name: "فاطمة الزهراء", role: "مصممة واجهات" },
  { id: 3, name: "عمر خالد", role: "مطور خلفية" },
  { id: 4, name: "نورا السالم", role: "مديرة مشروع" }
]

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتملة": return "bg-green-100 text-green-800 border-green-200"
      case "قيد التنفيذ": return "bg-blue-100 text-blue-800 border-blue-200"
      case "مُعيّنة": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "مرفوضة": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية": return "bg-red-100 text-red-800 border-red-200"
      case "متوسطة": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "منخفضة": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مكتملة": return <CheckCircle className="h-4 w-4" />
      case "قيد التنفيذ": return <Clock className="h-4 w-4" />
      case "مُعيّنة": return <AlertCircle className="h-4 w-4" />
      case "مرفوضة": return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const taskStats = {
    total: mockTasks.length,
    completed: mockTasks.filter(t => t.status === 'مكتملة').length,
    inProgress: mockTasks.filter(t => t.status === 'قيد التنفيذ').length,
    assigned: mockTasks.filter(t => t.status === 'مُعيّنة').length,
    rejected: mockTasks.filter(t => t.status === 'مرفوضة').length
  }

  return (
    <AdminLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              إدارة المهام
            </h1>
            <p className="text-gray-600 mt-2">مراقبة وإدارة جميع المهام المُعيّنة للفريق</p>
          </div>
          <Button 
            onClick={() => setShowCreateTask(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة مهمة جديدة
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800">إجمالي المهام</CardTitle>
              <CheckSquare className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{taskStats.total}</div>
              <p className="text-xs text-slate-600">جميع المهام</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">مكتملة</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{taskStats.completed}</div>
              <p className="text-xs text-green-600">
                {Math.round((taskStats.completed / taskStats.total) * 100)}% من المجموع
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">قيد التنفيذ</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{taskStats.inProgress}</div>
              <p className="text-xs text-blue-600">مهام نشطة</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-800">مُعيّنة</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">{taskStats.assigned}</div>
              <p className="text-xs text-yellow-600">في انتظار البدء</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">مرفوضة</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{taskStats.rejected}</div>
              <p className="text-xs text-red-600">تحتاج مراجعة</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">البحث والتصفية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في المهام..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white/80 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="مُعيّنة">مُعيّنة</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="مكتملة">مكتملة</option>
                <option value="مرفوضة">مرفوضة</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white/80 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">جميع الأولويات</option>
                <option value="عالية">عالية</option>
                <option value="متوسطة">متوسطة</option>
                <option value="منخفضة">منخفضة</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">قائمة المهام</CardTitle>
            <CardDescription>
              عرض {filteredTasks.length} من أصل {mockTasks.length} مهمة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-right font-semibold">المهمة</TableHead>
                    <TableHead className="text-right font-semibold">مُعيّنة إلى</TableHead>
                    <TableHead className="text-right font-semibold">الحالة</TableHead>
                    <TableHead className="text-right font-semibold">الأولوية</TableHead>
                    <TableHead className="text-right font-semibold">تاريخ الاستحقاق</TableHead>
                    <TableHead className="text-right font-semibold">التقدم</TableHead>
                    <TableHead className="text-right font-semibold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Badge variant="outline" className="text-xs">
                              {task.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {task.estimatedHours} ساعة متوقعة
                            </span>
                          </div>
                          {task.refusalReason && (
                            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                              السبب: {task.refusalReason}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{task.assignedTo}</div>
                        <div className="text-sm text-gray-500">
                          {mockEmployees.find(emp => emp.id === task.assignedToId)?.role}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(task.status)} border flex items-center space-x-1 space-x-reverse w-fit`}>
                          {getStatusIcon(task.status)}
                          <span>{task.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPriorityColor(task.priority)} border`}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {new Date(task.dueDate).toLocaleDateString('ar-SA')}
                          </div>
                          <div className="text-gray-500">
                            {Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} يوم متبقي
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{task.actualHours} من {task.estimatedHours} ساعة</span>
                            <span>{Math.round((task.actualHours / task.estimatedHours) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline" className="hover:bg-green-50 hover:text-green-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <CreateTaskDialog 
          open={showCreateTask} 
          onOpenChange={setShowCreateTask}
          employees={mockEmployees}
        />
      </div>
    </AdminLayout>
  )
}
