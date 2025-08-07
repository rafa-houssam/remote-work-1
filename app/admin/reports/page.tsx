"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Clock, Download, Calendar, Target, Award } from 'lucide-react'
import AdminLayout from "@/components/admin-layout"

const performanceData = [
  { name: "أحمد حسن", tasksCompleted: 18, tasksAssigned: 25, efficiency: 72, hoursWorked: 160 },
  { name: "فاطمة الزهراء", tasksCompleted: 15, tasksAssigned: 18, efficiency: 83, hoursWorked: 144 },
  { name: "عمر خالد", tasksCompleted: 22, tasksAssigned: 28, efficiency: 79, hoursWorked: 168 },
  { name: "نورا السالم", tasksCompleted: 20, tasksAssigned: 23, efficiency: 87, hoursWorked: 152 }
]

const monthlyStats = {
  totalTasks: 94,
  completedTasks: 75,
  totalHours: 624,
  averageEfficiency: 80,
  onTimeCompletion: 85,
  employeeSatisfaction: 92
}

const departmentStats = [
  { name: "التطوير", employees: 2, tasks: 50, completion: 76 },
  { name: "التصميم", employees: 1, tasks: 18, completion: 83 },
  { name: "إدارة المشاريع", employees: 1, tasks: 23, completion: 87 },
  { name: "ضمان الجودة", employees: 0, tasks: 3, completion: 100 }
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState("performance")

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`)
    // Simulate report generation
    alert("تم إنشاء التقرير بنجاح!")
  }

  return (
    <AdminLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              التقارير والتحليلات
            </h1>
            <p className="text-gray-600 mt-2">تحليل شامل لأداء الفريق والإنتاجية</p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
              <option value="quarter">هذا الربع</option>
              <option value="year">هذا العام</option>
            </select>
            <Button 
              onClick={generateReport}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">معدل الإنجاز</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {Math.round((monthlyStats.completedTasks / monthlyStats.totalTasks) * 100)}%
              </div>
              <p className="text-xs text-blue-600">
                {monthlyStats.completedTasks} من {monthlyStats.totalTasks} مهمة
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">الكفاءة المتوسطة</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{monthlyStats.averageEfficiency}%</div>
              <p className="text-xs text-green-600">
                +5% من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">إجمالي الساعات</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{monthlyStats.totalHours}</div>
              <p className="text-xs text-purple-600">
                ساعة هذا الشهر
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
              <BarChart3 className="h-5 w-5" />
              <span>أداء الموظفين</span>
            </CardTitle>
            <CardDescription>مقارنة أداء الموظفين خلال الفترة المحددة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceData.map((employee, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">
                        {employee.tasksCompleted} / {employee.tasksAssigned} مهمة مكتملة
                      </p>
                    </div>
                    <div className="text-left">
                      <Badge className={`${
                        employee.efficiency >= 80 ? 'bg-green-100 text-green-800' :
                        employee.efficiency >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {employee.efficiency}% كفاءة
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>إنجاز المهام</span>
                      <span>{Math.round((employee.tasksCompleted / employee.tasksAssigned) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(employee.tasksCompleted / employee.tasksAssigned) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>ساعات العمل</span>
                      <span>{employee.hoursWorked} ساعة</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min((employee.hoursWorked / 180) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
              <Users className="h-5 w-5" />
              <span>أداء الأقسام</span>
            </CardTitle>
            <CardDescription>مقارنة أداء الأقسام المختلفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departmentStats.map((dept, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-600">{dept.employees} موظف</p>
                    </div>
                    <Badge className={`${
                      dept.completion >= 85 ? 'bg-green-100 text-green-800' :
                      dept.completion >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dept.completion}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>المهام المكتملة</span>
                      <span>{Math.round((dept.tasks * dept.completion) / 100)} / {dept.tasks}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${dept.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-5 w-5" />
                <span>الالتزام بالمواعيد</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {monthlyStats.onTimeCompletion}%
                </div>
                <p className="text-gray-600">من المهام تم إنجازها في الوقت المحدد</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-600 h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${monthlyStats.onTimeCompletion}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                <Award className="h-5 w-5" />
                <span>رضا الموظفين</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {monthlyStats.employeeSatisfaction}%
                </div>
                <p className="text-gray-600">معدل رضا الموظفين العام</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${monthlyStats.employeeSatisfaction}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
