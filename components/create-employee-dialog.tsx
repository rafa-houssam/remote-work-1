"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Eye, EyeOff } from 'lucide-react'

interface CreateEmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateEmployeeDialog({ open, onOpenChange }: CreateEmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate employee ID
    const employeeId = `EMP${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    console.log("Creating employee:", { ...formData, employeeId })
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      password: "",
      confirmPassword: ""
    })
    
    setIsLoading(false)
    onOpenChange(false)
    
    // Show success message
    alert(`تم إنشاء حساب الموظف بنجاح!\nمعرف الموظف: ${employeeId}`)
  }

  const isFormValid = formData.name && formData.email && formData.phone && 
                     formData.role && formData.password && formData.confirmPassword &&
                     formData.password === formData.confirmPassword

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إضافة موظف جديد</DialogTitle>
          <DialogDescription>
            قم بإنشاء حساب جديد لموظف في الشركة
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emp-name">الاسم الكامل *</Label>
              <Input
                id="emp-name"
                placeholder="أدخل الاسم الكامل"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emp-email">البريد الإلكتروني *</Label>
              <Input
                id="emp-email"
                type="email"
                placeholder="employee@company.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emp-phone">رقم الهاتف *</Label>
              <Input
                id="emp-phone"
                type="tel"
                placeholder="+966 50 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emp-role">المسمى الوظيفي *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المسمى الوظيفي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مطور واجهات أمامية">مطور واجهات أمامية</SelectItem>
                  <SelectItem value="مطور خلفية">مطور خلفية</SelectItem>
                  <SelectItem value="مطور تطبيقات الهاتف">مطور تطبيقات الهاتف</SelectItem>
                  <SelectItem value="مصمم واجهات">مصمم واجهات</SelectItem>
                  <SelectItem value="مصمم جرافيك">مصمم جرافيك</SelectItem>
                  <SelectItem value="محلل أنظمة">محلل أنظمة</SelectItem>
                  <SelectItem value="مختبر برمجيات">مختبر برمجيات</SelectItem>
                  <SelectItem value="مدير مشروع">مدير مشروع</SelectItem>
                  <SelectItem value="كاتب محتوى">كاتب محتوى</SelectItem>
                  <SelectItem value="مسوق رقمي">مسوق رقمي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emp-department">القسم</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="التطوير">التطوير</SelectItem>
                <SelectItem value="التصميم">التصميم</SelectItem>
                <SelectItem value="التسويق">التسويق</SelectItem>
                <SelectItem value="إدارة المشاريع">إدارة المشاريع</SelectItem>
                <SelectItem value="ضمان الجودة">ضمان الجودة</SelectItem>
                <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                <SelectItem value="المبيعات">المبيعات</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emp-password">كلمة المرور *</Label>
              <div className="relative">
                <Input
                  id="emp-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة مرور قوية"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="text-right pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emp-confirm-password">تأكيد كلمة المرور *</Label>
              <div className="relative">
                <Input
                  id="emp-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="أعد إدخال كلمة المرور"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="text-right pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-600">كلمات المرور غير متطابقة</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 space-x-reverse">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isLoading ? "جاري الإنشاء..." : "إنشاء الحساب"}
            {!isLoading && <UserPlus className="mr-2 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
