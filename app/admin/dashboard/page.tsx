// app/(admin)/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CheckCircle, Clock, Activity, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminLayout from "@/components/admin-layout";
import CreateTaskDialog from "@/components/create-task-dialog";
import CreateEmployeeDialog from "@/components/create-employee-dialog";
import { useSession } from "next-auth/react";

type Company = {
  _id: string;
  name: string;
};

type UserRow = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  companyId?: Company | string;
  lastActive?: string;
  isOnline?: boolean;
  tasksCompleted?: number; // computed server-side or client-side if you prefer
};

type TaskRow = {
  _id: string;
  title: string;
  description?: string;
  status: "assigned" | "treated" | "done" | "refused";
  priority?: "low" | "medium" | "high" | "urgent";
  dueDate?: string;
  assignedTo?: { _id: string; name: string } | string;
  assignedBy?: { _id: string; name: string } | string;
  refuseReason?: string;
};

type LogRow = {
  _id: string;
  userId: { _id: string; name: string } | string;
  action: string;
  timestamp: string;
  taskTitle?: string;
  fileName?: string;
  durationText?: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateEmployee, setShowCreateEmployee] = useState(false);

  const [employees, setEmployees] = useState<UserRow[]>([]);
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [logs, setLogs] = useState<LogRow[]>([]);
  const session=useSession()
  const name=session.data?.user.name
  const email=session.data?.user.email
  const loggedInUser = employees.find(
  (e) => e.name === name && e.email === email
);
  

  // ---- helpers (Arabic UI mapping) ----
  const statusLabel = (s?: TaskRow["status"]) => {
    switch (s) {
      case "done": return "مكتملة";
      case "treated": return "قيد التنفيذ";
      case "assigned": return "مُعيّنة";
      case "refused": return "مرفوضة";
      default: return "غير معروف";
    }
  };
  const statusBadge = (s?: TaskRow["status"]) => {
    switch (s) {
      case "done": return "bg-green-100 text-green-800";
      case "treated": return "bg-blue-100 text-blue-800";
      case "assigned": return "bg-yellow-100 text-yellow-800";
      case "refused": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const priorityLabel = (p?: TaskRow["priority"]) => {
    switch (p) {
      case "urgent": return "عاجلة";
      case "high": return "عالية";
      case "medium": return "متوسطة";
      case "low": return "منخفضة";
      default: return "غير محددة";
    }
  };
  const priorityBadge = (p?: TaskRow["priority"]) => {
    switch (p) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // ---- fetch all admin data ----
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersRes, tasksRes, companiesRes, logsRes] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/tasks"),
          fetch("/api/admin/companies"),
          fetch("/api/admin/logs"),
        ]);

        const [usersJson, tasksJson, companiesJson, logsJson] = await Promise.all([
          usersRes.json(),
          tasksRes.json(),
          companiesRes.json(),
          logsRes.json(),
        ]);

        setEmployees(usersJson || []);
        setTasks(tasksJson || []);
        setCompanies(companiesJson || []);
        setLogs(logsJson || []);
      } catch (e) {
        console.error("Failed to fetch admin data:", e);
      }
    };
    fetchAll();
  }, []);

  const onlineCount = employees.filter(e => e.isOnline).length;
  const completedTasksCount = tasks.filter(t => t.status === "done").length;
  const pendingTasksCount = tasks.filter(t => ["assigned", "treated"].includes(t.status)).length;

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
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-blue-100">{onlineCount} متصل الآن</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المهام المكتملة</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasksCount}</div>
              <p className="text-xs text-green-100">إجمالي</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المهام المعلقة</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasksCount}</div>
              <p className="text-xs text-yellow-100">مُعيّنة / قيد التنفيذ</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ساعات العمل النشطة</CardTitle>
              <Activity className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">—</div>
              <p className="text-xs text-purple-100">تم تجاهلها كما طلبت</p>
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

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>المهام الأخيرة</CardTitle>
                  <CardDescription>آخر تحديثات المهام من فريقك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-600">
                          {(typeof task.assignedTo === "object" && task.assignedTo?.name) || "—"}
                        </p>
                      </div>
                      <Badge className={statusBadge(task.status)}>{statusLabel(task.status)}</Badge>
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
                  {employees.map((employee) => (
                    <div key={employee._id} className="flex items-center space-x-3 space-x-reverse">
                      <Avatar>
                        <AvatarImage src={(employee as any).avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee?.name?.split(" ").map((n) => n[0]).join("") || "؟"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{employee?.name}</p>
                        <p className="text-sm text-gray-600">{employee.role || "—"}</p>
                      </div>
                      <div className="text-left">
                        <Badge variant={employee.isOnline ? "default" : "secondary"}>
                          {employee.isOnline ? "متصل" : "غير متصل"}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {employee.lastActive ? new Date(employee.lastActive).toLocaleString("ar-SA") : "—"}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employees */}
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
                      <TableHead className="text-right">الشركة</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">آخر نشاط</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee._id}>
                        <TableCell className="flex items-center space-x-3 space-x-reverse">
                          <Avatar>
                            <AvatarImage src={(employee as any).avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {employee?.name?.split(" ").map((n) => n[0]).join("") || "؟"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee?.name}</p>
                            <p className="text-sm text-gray-600">{employee.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{employee.role || "—"}</TableCell>
                        <TableCell>
                          {typeof employee.companyId === "object"
                            ? (employee.companyId as Company)?.name
                            : "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={employee.isOnline ? "default" : "secondary"}>
                            {employee.isOnline ? "متصل" : "غير متصل"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {employee.lastActive ? new Date(employee.lastActive).toLocaleString("ar-SA") : "—"}
                        </TableCell>
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

          {/* Tasks */}
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
                    {tasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-gray-600">{task.description || "—"}</p>
                            {task.refuseReason && (
                              <p className="text-sm text-red-600 mt-1">السبب: {task.refuseReason}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {(typeof task.assignedTo === "object" && task.assignedTo?.name) || "—"}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusBadge(task.status)}>{statusLabel(task.status)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityBadge(task.priority)}>{priorityLabel(task.priority)}</Badge>
                        </TableCell>
                        <TableCell>
                          {task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "—"}
                        </TableCell>
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

          {/* Activity */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>سجل النشاط</CardTitle>
                <CardDescription>تتبع جميع أنشطة الموظفين وأحداث النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log._id} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {(typeof log.userId === "object" && (log.userId as any)?.name) || "—"}
                        </p>
                        <p className="text-sm text-gray-600">{log.action}</p>
                        {log.taskTitle && <p className="text-sm text-blue-600">المهمة: {log.taskTitle}</p>}
                        {log.fileName && <p className="text-sm text-green-600">الملف: {log.fileName}</p>}
                        {log.durationText && <p className="text-sm text-purple-600">المدة: {log.durationText}</p>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {log.timestamp ? new Date(log.timestamp).toLocaleString("ar-SA") : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs (will hit your POST routes if you wire them) */}
        // Find the logged-in user object from employees


<CreateTaskDialog
  open={showCreateTask}
  onOpenChange={setShowCreateTask}
  employees={employees.map(e => ({
    _id: e._id, // keep same field name as in component
    name: e.name,
    role: e.role,
    email: e.email
  }))}
  currentUserId={loggedInUser?._id || ""}
  companyId={loggedInUser?.companyId || ""}
/>

        <CreateEmployeeDialog
          open={showCreateEmployee}
          onOpenChange={setShowCreateEmployee}
          companyId="689e517ebc9bba564fb1ff92"
        />
      </div>
    </AdminLayout>
  );
}
