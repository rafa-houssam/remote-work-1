"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, Eye, Edit, Trash2, UserCheck, UserX, Mail, Phone } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminLayout from "@/components/admin-layout"
import CreateEmployeeDialog from "@/components/create-employee-dialog"

const mockEmployees = [
  {
    id: 1,
    name: "أحمد حسن",
    email: "ahmed@company.com",
    phone: "+966 50 123 4567",
    role: "مطور واجهات أمامية",
    department: "التطوير",
    status: "متصل",
    lastActive: "منذ دقيقتين",
    tasksCompleted: 12,
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    name: "فاطمة الزهراء",
    email: "fatima@company.com",
    phone: "+966 55 987 6543",
    role: "مصممة واجهات",
    department: "التصميم",
    status: "غير متصل",
    lastActive: "منذ ساعة",
    tasksCompleted: 8,
    joinDate: "2023-07-20",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    name: "عمر خالد",
    email: "omar@company.com",
    phone: "+966 56 456 7890",
    role: "مطور خلفية",
    department: "التطوير",
    status: "متصل",
    lastActive: "منذ 5 دقائق",
    tasksCompleted: 15,
    joinDate: "2023-05-10",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 4,
    name: "نورا السالم",
    email: "nora@company.com",
    phone: "+966 54 321 0987",
    role: "مديرة مشروع",
    department: "إدارة المشاريع",
    status: "متصل",
    lastActive: "منذ 10 دقائق",
    tasksCompleted: 20,
    joinDate: "2023-04-01",
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateEmployee, setShowCreateEmployee] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const departments = ["all", ...Array.from(new Set(mockEmployees.map(emp => emp.department)))]

  return (
    <AdminLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              إدارة الموظفين
            </h1>
            <p className="text-gray-600 mt-2">إدارة حسابات الموظفين وصلاحياتهم</p>
          </div>
          <Button 
            onClick={() => setShowCreateEmployee(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة موظف جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">إجمالي الموظفين</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{mockEmployees.length}</div>
              <p className="text-xs text-blue-600">
                +2 هذا الشهر
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">متصل الآن</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {mockEmployees.filter(e => e.status === 'متصل').length}
              </div>
              <p className="text-xs text-green-600">
                {Math.round((mockEmployees.filter(e => e.status === 'متصل').length / mockEmployees.length) * 100)}% من الفريق
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">الأقسام</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {departments.length - 1}
              </div>
              <p className="text-xs text-purple-600">
                أقسام نشطة
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">متوسط المهام</CardTitle>
              <UserCheck className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {Math.round(mockEmployees.reduce((acc, emp) => acc + emp.tasksCompleted, 0) / mockEmployees.length)}
              </div>
              <p className="text-xs text-orange-600">
                مهمة لكل موظف
              </p>
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
                  placeholder="البحث عن موظف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white/80 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">جميع الأقسام</option>
                {departments.slice(1).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Employees Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">قائمة الموظفين</CardTitle>
            <CardDescription>
              عرض {filteredEmployees.length} من أصل {mockEmployees.length} موظف
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-right font-semibold">الموظف</TableHead>
                    <TableHead className="text-right font-semibold">القسم</TableHead>
                    <TableHead className="text-right font-semibold">الحالة</TableHead>
                    <TableHead className="text-right font-semibold">المهام المكتملة</TableHead>
                    <TableHead className="text-right font-semibold">آخر نشاط</TableHead>
                    <TableHead className="text-right font-semibold">تاريخ الانضمام</TableHead>
                    <TableHead className="text-right font-semibold">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <Avatar className="h-12 w-12 ring-2 ring-white/50">
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">{employee.name}</p>
                            <p className="text-sm text-gray-600">{employee.role}</p>
                            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500 mt-1">
                              <Mail className="h-3 w-3" />
                              <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                              <Phone className="h-3 w-3" />
                              <span>{employee.phone}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {employee.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className={`h-2 w-2 rounded-full ${
                            employee.status === 'متصل' ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                          <Badge variant={employee.status === 'متصل' ? 'default' : 'secondary'}>
                            {employee.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{employee.tasksCompleted}</div>
                          <div className="text-xs text-gray-500">مهمة</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {employee.lastActive}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(employee.joinDate).toLocaleDateString('ar-SA')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
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

        <CreateEmployeeDialog 
          open={showCreateEmployee} 
          onOpenChange={setShowCreateEmployee}
        />
      </div>
    </AdminLayout>
  )
}
