"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, Building2, Users, Bell, Shield, Palette, Globe, Save, Eye, EyeOff, Upload } from 'lucide-react'
import AdminLayout from "@/components/admin-layout"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [companySettings, setCompanySettings] = useState({
    name: "شركة التقنية المتقدمة",
    description: "شركة رائدة في مجال تطوير البرمجيات والحلول التقنية المتقدمة",
    industry: "التكنولوجيا",
    size: "11-50",
    website: "https://techcompany.com",
    phone: "+966 11 123 4567",
    email: "info@techcompany.com",
    address: "الرياض، المملكة العربية السعودية",
    logo: "/placeholder.svg?height=100&width=100"
  })

  const [adminSettings, setAdminSettings] = useState({
    name: "سارة المدير",
    email: "admin@company.com",
    phone: "+966 50 987 6543",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskUpdates: true,
    employeeActivity: false,
    systemAlerts: true,
    weeklyReports: true,
    dailyDigest: false
  })

  const [systemSettings, setSystemSettings] = useState({
    workingHours: "8",
    workingDays: "5",
    timezone: "Asia/Riyadh",
    language: "ar",
    dateFormat: "dd/mm/yyyy",
    currency: "SAR"
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
    ipWhitelist: ""
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(`Saving ${section} settings`)
    setIsLoading(false)
    alert("تم حفظ الإعدادات بنجاح!")
  }

  return (
    <AdminLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            الإعدادات
          </h1>
          <p className="text-gray-600 mt-2">إدارة إعدادات النظام والشركة</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="company" className="flex items-center space-x-2 space-x-reverse">
              <Building2 className="h-4 w-4" />
              <span>الشركة</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-4 w-4" />
              <span>المدير</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2 space-x-reverse">
              <Bell className="h-4 w-4" />
              <span>الإشعارات</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2 space-x-reverse">
              <Settings className="h-4 w-4" />
              <span>النظام</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2 space-x-reverse">
              <Shield className="h-4 w-4" />
              <span>الأمان</span>
            </TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                  <Building2 className="h-5 w-5" />
                  <span>إعدادات الشركة</span>
                </CardTitle>
                <CardDescription>إدارة معلومات الشركة الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Logo */}
                <div className="flex items-center space-x-6 space-x-reverse">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={companySettings.logo || "/placeholder.svg"} alt="Company Logo" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                      شت
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="mb-2">
                      <Upload className="h-4 w-4 ml-2" />
                      تغيير الشعار
                    </Button>
                    <p className="text-sm text-gray-600">PNG, JPG حتى 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">اسم الشركة</Label>
                    <Input
                      id="company-name"
                      value={companySettings.name}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, name: e.target.value }))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-industry">القطاع</Label>
                    <select
                      id="company-industry"
                      value={companySettings.industry}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="التكنولوجيا">التكنولوجيا</option>
                      <option value="المالية">المالية</option>
                      <option value="الصحة">الصحة</option>
                      <option value="التعليم">التعليم</option>
                      <option value="التجارة">التجارة</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-size">حجم الشركة</Label>
                    <select
                      id="company-size"
                      value={companySettings.size}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, size: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="1-10">1-10 موظفين</option>
                      <option value="11-50">11-50 موظف</option>
                      <option value="51-200">51-200 موظف</option>
                      <option value="201-500">201-500 موظف</option>
                      <option value="500+">أكثر من 500 موظف</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-website">الموقع الإلكتروني</Label>
                    <Input
                      id="company-website"
                      type="url"
                      value={companySettings.website}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, website: e.target.value }))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-phone">رقم الهاتف</Label>
                    <Input
                      id="company-phone"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, phone: e.target.value }))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-email">البريد الإلكتروني</Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, email: e.target.value }))}
                      className="text-right"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-description">وصف الشركة</Label>
                  <Textarea
                    id="company-description"
                    value={companySettings.description}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, description: e.target.value }))}
                    className="text-right min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">العنوان</Label>
                  <Textarea
                    id="company-address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, address: e.target.value }))}
                    className="text-right"
                  />
                </div>

                <Button 
                  onClick={() => handleSave('company')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="h-4 w-4 ml-2" />
                  {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Settings */}
          <TabsContent value="admin">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                  <Users className="h-5 w-5" />
                  <span>إعدادات المدير</span>
                </CardTitle>
                <CardDescription>إدارة معلومات حساب المدير</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">الاسم الكامل</Label>
                    <Input
                      id="admin-name"
                      value={adminSettings.name}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, name: e.target.value }))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">البريد الإلكتروني</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={adminSettings.email}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, email: e.target.value }))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-phone">رقم الهاتف</Label>
                    <Input
                      id="admin-phone"
                      value={adminSettings.phone}
                      onChange={(e) => setAdminSettings(prev => ({ ...prev, phone: e.target.value }))}
                      className="text-right"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">تغيير كلمة المرور</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={adminSettings.currentPassword}
                          onChange={(e) => setAdminSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="text-right pl-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={adminSettings.newPassword}
                        onChange={(e) => setAdminSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="text-right"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={adminSettings.confirmPassword}
                        onChange={(e) => setAdminSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="text-right"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave('admin')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="h-4 w-4 ml-2" />
                  {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                  <Bell className="h-5 w-5" />
                  <span>إعدادات الإشعارات</span>
                </CardTitle>
                <CardDescription>تخصيص الإشعارات والتنبيهات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">الإشعارات عبر البريد الإلكتروني</h4>
                      <p className="text-sm text-gray-600">تلقي الإشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">تحديثات المهام</h4>
                      <p className="text-sm text-gray-600">إشعارات عند تحديث حالة المهام</p>
                    </div>
                    <Switch
                      checked={notificationSettings.taskUpdates}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, taskUpdates: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">نشاط الموظفين</h4>
                      <p className="text-sm text-gray-600">إشعارات عند دخول وخروج الموظفين</p>
                    </div>
                    <Switch
                      checked={notificationSettings.employeeActivity}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, employeeActivity: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">تنبيهات النظام</h4>
                      <p className="text-sm text-gray-600">تنبيهات مهمة حول النظام</p>
                    </div>
                    <Switch
                      checked={notificationSettings.systemAlerts}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, systemAlerts: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">التقارير الأسبوعية</h4>
                      <p className="text-sm text-gray-600">تقرير أسبوعي عن أداء الفريق</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, weeklyReports: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">الملخص اليومي</h4>
                      <p className="text-sm text-gray-600">ملخص يومي للأنشطة والمهام</p>
                    </div>
                    <Switch
                      checked={notificationSettings.dailyDigest}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, dailyDigest: checked }))
                      }
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave('notifications')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="h-4 w-4 ml-2" />
                  {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                  <Settings className="h-5 w-5" />
                  <span>إعدادات النظام</span>
                </CardTitle>
                <CardDescription>تخصيص إعدادات النظام العامة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="working-hours">ساعات العمل اليومية</Label>
                    <select
                      id="working-hours"
                      value={systemSettings.workingHours}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, workingHours: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="6">6 ساعات</option>
                      <option value="7">7 ساعات</option>
                      <option value="8">8 ساعات</option>
                      <option value="9">9 ساعات</option>
                      <option value="10">10 ساعات</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="working-days">أيام العمل الأسبوعية</Label>
                    <select
                      id="working-days"
                      value={systemSettings.workingDays}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, workingDays: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="4">4 أيام</option>
                      <option value="5">5 أيام</option>
                      <option value="6">6 أيام</option>
                      <option value="7">7 أيام</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">المنطقة الزمنية</Label>
                    <select
                      id="timezone"
                      value={systemSettings.timezone}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                      <option value="Asia/Dubai">دبي (GMT+4)</option>
                      <option value="Asia/Kuwait">الكويت (GMT+3)</option>
                      <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">اللغة</Label>
                    <select
                      id="language"
                      value={systemSettings.language}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">تنسيق التاريخ</Label>
                    <select
                      id="date-format"
                      value={systemSettings.dateFormat}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                      <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                      <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة</Label>
                    <select
                      id="currency"
                      value={systemSettings.currency}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="SAR">ريال سعودي (SAR)</option>
                      <option value="AED">درهم إماراتي (AED)</option>
                      <option value="USD">دولار أمريكي (USD)</option>
                      <option value="EUR">يورو (EUR)</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave('system')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="h-4 w-4 ml-2" />
                  {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                  <Shield className="h-5 w-5" />
                  <span>إعدادات الأمان</span>
                </CardTitle>
                <CardDescription>تعزيز أمان النظام والحسابات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">المصادقة الثنائية</h4>
                    <p className="text-sm text-gray-600">تفعيل المصادقة الثنائية لحماية إضافية</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">انتهاء الجلسة (دقيقة)</Label>
                    <select
                      id="session-timeout"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="15">15 دقيقة</option>
                      <option value="30">30 دقيقة</option>
                      <option value="60">60 دقيقة</option>
                      <option value="120">120 دقيقة</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">انتهاء كلمة المرور (يوم)</Label>
                    <select
                      id="password-expiry"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="30">30 يوم</option>
                      <option value="60">60 يوم</option>
                      <option value="90">90 يوم</option>
                      <option value="180">180 يوم</option>
                      <option value="365">365 يوم</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-attempts">محاولات تسجيل الدخول</Label>
                    <select
                      id="login-attempts"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAttempts: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="3">3 محاولات</option>
                      <option value="5">5 محاولات</option>
                      <option value="10">10 محاولات</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip-whitelist">قائمة عناوين IP المسموحة</Label>
                  <Textarea
                    id="ip-whitelist"
                    placeholder="192.168.1.1&#10;10.0.0.1&#10;..."
                    value={securitySettings.ipWhitelist}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                    className="text-right min-h-[100px]"
                  />
                  <p className="text-sm text-gray-600">أدخل عنوان IP واحد في كل سطر</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Shield className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-800">تحذير أمني</h4>
                  </div>
                  <p className="text-sm text-yellow-700 mt-2">
                    تأكد من حفظ إعدادات الأمان بعناية. قد تؤثر هذه الإعدادات على وصول المستخدمين للنظام.
                  </p>
                </div>

                <Button 
                  onClick={() => handleSave('security')}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  <Save className="h-4 w-4 ml-2" />
                  {isLoading ? "جاري الحفظ..." : "حفظ إعدادات الأمان"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
