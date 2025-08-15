"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Eye, EyeOff } from 'lucide-react';

interface CreateEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

export default function CreateEmployeeDialog({ open, onOpenChange, companyId }: CreateEmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    position: "",
    role: "employee",
    geoPosition: "",
    dateOfJoining: "",
    bio: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          companyId,
          dateOfJoining: formData.dateOfJoining || new Date()
        })
      });

      if (!res.ok) throw new Error("فشل إنشاء الموظف");

      const data = await res.json();
      alert(`تم إنشاء حساب الموظف بنجاح!\nمعرف: ${data._id}`);

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        position: "",
        role: "employee",
        geoPosition: "",
        dateOfJoining: "",
        bio: "",
        password: "",
        confirmPassword: ""
      });
      onOpenChange(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phoneNumber &&
    formData.position &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إضافة موظف جديد</DialogTitle>
          <DialogDescription>قم بإنشاء حساب جديد لموظف في الشركة</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* name + email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>الاسم الكامل *</Label>
              <Input value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="text-right" />
            </div>
            <div>
              <Label>البريد الإلكتروني *</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="text-right" />
            </div>
          </div>

          {/* phone + position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>رقم الهاتف *</Label>
              <Input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))} className="text-right" />
            </div>
            <div>
              <Label>المسمى الوظيفي *</Label>
              <Input value={formData.position} onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))} className="text-right" />
            </div>
          </div>

          {/* role + geoPosition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div>
              <Label>الموقع الجغرافي</Label>
              <Input value={formData.geoPosition} onChange={(e) => setFormData(prev => ({ ...prev, geoPosition: e.target.value }))} className="text-right" />
            </div>
          </div>

          {/* dateOfJoining + bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>تاريخ الانضمام</Label>
              <Input type="date" value={formData.dateOfJoining} onChange={(e) => setFormData(prev => ({ ...prev, dateOfJoining: e.target.value }))} />
            </div>
            <div>
              <Label>نبذة</Label>
              <Textarea value={formData.bio} onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))} className="text-right" />
            </div>
          </div>

          {/* password + confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>كلمة المرور *</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} className="text-right pl-10" />
                <Button type="button" variant="ghost" size="sm" className="absolute left-0 top-0 h-full px-3 py-2" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label>تأكيد كلمة المرور *</Label>
              <div className="relative">
                <Input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))} className="text-right pl-10" />
                <Button type="button" variant="ghost" size="sm" className="absolute left-0 top-0 h-full px-3 py-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="flex justify-end space-x-2 space-x-reverse">
          <Button variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
          <Button onClick={handleSubmit} disabled={!isFormValid || isLoading} className="bg-gradient-to-r from-green-600 to-blue-600">
            {isLoading ? "جاري الإنشاء..." : "إنشاء الحساب"}
            {!isLoading && <UserPlus className="mr-2 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
