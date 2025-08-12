"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, Play, Pause, Calendar } from "lucide-react";
import EmployeeLayout from "@/components/employee-layout";
import { useSession } from "next-auth/react";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const [workStartTime, setWorkStartTime] = useState<Date | null>(null);


  const session=useSession()
  useEffect(() => {
  if (session.status === "loading") return;
  if (!session?.data?.user?.email || !session?.data?.user?.name) return;

  // Step 1: Send email & name to the backend
  fetch("/api/auth/user/by-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: session.data.user.email,
      name: session.data.user.name,
    }),
  })
    .then(res => res.json())
    .then(userData => {
      if (!userData?._id) {
        console.error("User not found in DB");
        return;
      }

      setEmployee(userData);



      // Step 3: Fetch tasks
      fetch(`/api/employee/${userData._id}/tasks`)
        .then(res => res.json())
        .then(data => {
          setTasks(data)
        })
        .catch(err => console.error("Error fetching tasks:", err));
    })
    .catch(err => console.error("Error fetching user:", err));
}, [session.status]);
console.log(employee)


  const handleStartWork = () => {
    setIsWorking(true);
    setWorkStartTime(new Date());
  };

  const handleStopWork = () => {
    setIsWorking(false);
    setWorkStartTime(null);
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      setTasks(prev =>
        prev.map(t => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-800";
      case "treated":
        return "bg-blue-100 text-blue-800";
      case "assigned":
        return "bg-yellow-100 text-yellow-800";
      case "refused":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (session.status === "loading") {
    return <p className="text-center mt-10">جارٍ التحميل...</p>;
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              مرحباً بعودتك، {employee?.name}!
            </h1>
            <p className="text-gray-600">تتبع مهامك وأدر عملك بكفاءة</p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            {!isWorking ? (
              <Button
                onClick={handleStartWork}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 ml-2" /> بدء العمل
              </Button>
            ) : (
              <Button onClick={handleStopWork} variant="destructive">
                <Pause className="h-4 w-4 ml-2" /> إيقاف العمل
              </Button>
            )}
            {isWorking && workStartTime && (
              <div className="text-sm text-gray-600">
                العمل منذ: {workStartTime.toLocaleTimeString("ar-SA")}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-sm">إجمالي المهام</CardTitle>
              <FileText className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employee?.totalTasks}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="text-sm">مكتملة</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employee?.completedTasks}</div>
              <p className="text-xs">
                {Math.round(
                  (employee?.completedTasks / employee?.totalTasks) * 100
                )}
                % إنجاز
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader>
              <CardTitle className="text-sm">معلقة</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  tasks.filter(
                    t => t.status === "assigned" || t.status === "treated"
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-sm">هذا الأسبوع</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-- ساعة</div>
            </CardContent>
          </Card>
        </div>

        {/* Task list */}
        <Card>
          <CardHeader>
            <CardTitle>مهامي</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.map(task => (
              <Card
                key={task._id}
                className="border-r-4 border-r-blue-500 mb-4"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                      <div className="text-sm text-gray-600">
                        مُعيّنة من: {task.assignedBy?.name} - الاستحقاق:{" "}
                        {task.dueDate?.split("T")[0]}
                      </div>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {task.status === "assigned" && (
                    <Button
                      onClick={() =>
                        handleTaskStatusChange(task._id, "treated")
                      }
                    >
                      بدء العمل
                    </Button>
                  )}
                  {task.status === "treated" && (
                    <>
                      <Button
                        onClick={() =>
                          handleTaskStatusChange(task._id, "done")
                        }
                      >
                        تم الإنجاز
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleTaskStatusChange(task._id, "refused")
                        }
                      >
                        رفض
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
