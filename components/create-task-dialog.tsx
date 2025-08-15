"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Employee {
  _id: string;
  name: string;
  role?: string;
}

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[]; // fetched from backend
  companyId: string;
  currentUserId: string; // the logged-in user ID (assignedBy)
}

export default function CreateTaskDialog({
  open,
  onOpenChange,
  employees,
  companyId,
  currentUserId
}: CreateTaskDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "",
    dueDate: undefined as Date | undefined,
    category: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
  if (!isFormValid) return;
  setIsLoading(true);

  try {
    const res = await fetch("/api/admin/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId,
        assignedBy: currentUserId,
        assignedTo: formData.assignedTo, // string, will be cast to ObjectId
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate, // still a Date object
      }),
    });

    if (!res.ok) throw new Error("فشل إنشاء المهمة");

    await res.json();
    alert("تم إنشاء المهمة بنجاح ✅");

    // reset form
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      priority: "",
      dueDate: undefined,
      category: "",
    });

    onOpenChange(false);
  } catch (err: any) {
    alert(err.message);
  } finally {
    setIsLoading(false);
  }
};


  const isFormValid =
    formData.title &&
    formData.description &&
    formData.assignedTo &&
    formData.priority &&
    formData.dueDate;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إضافة مهمة جديدة</DialogTitle>
          <DialogDescription>قم بإنشاء مهمة جديدة وتعيينها لأحد أعضاء الفريق</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* title + category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">عنوان المهمة *</Label>
              <Input
                id="title"
                placeholder="أدخل عنوان المهمة"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="text-right"
              />
            </div>

            <div>
              <Label htmlFor="category">الفئة</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر فئة المهمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">التطوير</SelectItem>
                  <SelectItem value="design">التصميم</SelectItem>
                  <SelectItem value="testing">الاختبار</SelectItem>
                  <SelectItem value="documentation">التوثيق</SelectItem>
                  <SelectItem value="research">البحث</SelectItem>
                  <SelectItem value="meeting">الاجتماعات</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* description */}
          <div>
            <Label htmlFor="description">وصف المهمة *</Label>
            <Textarea
              id="description"
              placeholder="أدخل وصف تفصيلي للمهمة"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="text-right min-h-[100px]"
            />
          </div>

          {/* assignedTo + priority */}
          {/* Employee selection */}
          You said:
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Employee Selection */}
  <div>
  <Label htmlFor="assignedTo">تعيين إلى *</Label>
  <Select
    value={formData.assignedTo || ""}
    onValueChange={(value) =>
      setFormData((prev) => ({ ...prev, assignedTo: value }))
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="اختر الموظف" />
    </SelectTrigger>
    <SelectContent>
      {employees && employees.length > 0 ? (
        employees.map((employee) => (
          <SelectItem
            key={employee._id}
            value={employee._id} // string is fine, mongoose will cast to ObjectId
          >
            {employee.role
              ? `${employee.name} (${employee.role})`
              : employee.name}
          </SelectItem>
        ))
      ) : (
        <SelectItem disabled value="">
          لا يوجد موظفون متاحون
        </SelectItem>
      )}
    </SelectContent>
  </Select>
</div>
  {/* Priority Selection */}
  <div>
    <Label htmlFor="priority">الأولوية *</Label>
    <Select
      value={formData.priority}
      onValueChange={(value) =>
        setFormData((prev) => ({ ...prev, priority: value }))
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="اختر الأولوية" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="urgent">عاجلة</SelectItem>
        <SelectItem value="high">عالية</SelectItem>
        <SelectItem value="medium">متوسطة</SelectItem>
        <SelectItem value="low">منخفضة</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div> 



          {/* due date */}
          <div>
            <Label>تاريخ الاستحقاق *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-right font-normal"
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {formData.dueDate ? (
                    format(formData.dueDate, "PPP", { locale: ar })
                  ) : (
                    <span>اختر تاريخ الاستحقاق</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dueDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* actions */}
        <div className="flex justify-end space-x-2 space-x-reverse">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {isLoading ? "جاري الإنشاء..." : "إنشاء المهمة"}
            {!isLoading && <Plus className="mr-2 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
