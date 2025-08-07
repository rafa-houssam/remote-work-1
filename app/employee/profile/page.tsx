"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X } from 'lucide-react'
import EmployeeLayout from "@/components/employee-layout"

const mockEmployee = {
  id: 1,
  name: "أحمد حسن",
  email: "ahmed@company.com",
  phone: "+966 50 123 4567",
  role: "مطور واجهات أمامية",
  department: "التطوير",
  joinDate: "2023-06-15",
  location: "الرياض، السعودية",
  bio: "مطور واجهات أمامية متخصص في React و TypeScript مع خبرة 5 سنوات في تطوير تطبيقات الويب الحديثة.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
  totalTasks: 25,
  completedTasks: 18,
  avatar: "/placeholder.svg?height=120&width=120"
}

const achievements = [
  {
    title: "أفضل موظف الشهر",
    description: "ديسمبر 2023",
    icon: "🏆"
  },
  {
    title: "إنجاز 100 مهمة",
    description: "معلم مهم في الإنتاجية",
    icon: "🎯"
  },
  {
    title: "عضو الفريق المثالي",
    description: "تعاون ممتاز مع الزملاء",
    icon: "🤝"
  }
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: mockEmployee.name,
    email: mockEmployee.email,
    phone: mockEmployee.phone,
    location: mockEmployee.location,
    bio: mockEmployee.bio
  })

  const handleSave = () => {
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: mockEmployee.name,
      email: mockEmployee.email,
      phone: mockEmployee.phone,
      location: mockEmployee.location,
      bio: mockEmployee.bio
    })
    setIsEditing(false)
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
            <p className="text-gray-600">عرض وتحديث معلوماتك الشخصية</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 ml-2" />
              تعديل الملف
            </Button>
          ) : (
            <div className="flex space-x-2 space-x-reverse">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 ml-2" />
                إلغاء
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأساسية</CardTitle>
                <CardDescription>معلوماتك الشخصية والمهنية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6 space-x-reverse">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={mockEmployee.avatar || "/placeholder.svg"} alt={mockEmployee.name} />
                    <AvatarFallback className="text-2xl">
                      {mockEmployee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{mockEmployee.name}</h2>
                    <p className="text-gray-600">{mockEmployee.role}</p>
                    <Badge variant="secondary">{mockEmployee.department}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-right"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{mockEmployee.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="text-right"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{mockEmployee.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="text-right"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{mockEmployee.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="text-right"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{mockEmployee.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>تاريخ الانضمام</Label>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(mockEmployee.joinDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>المسمى الوظيفي</Label>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{mockEmployee.role}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      className="text-right min-h-[100px]"
                      placeholder="اكتب نبذة مختصرة عنك..."
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded text-gray-700 leading-relaxed">
                      {mockEmployee.bio}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>المهارات التقنية</CardTitle>
                <CardDescription>المهارات والتقنيات التي تتقنها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockEmployee.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الأداء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{mockEmployee.totalTasks}</div>
                  <p className="text-sm text-blue-800">إجمالي المهام</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{mockEmployee.completedTasks}</div>
                  <p className="text-sm text-green-800">مهام مكتملة</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((mockEmployee.completedTasks / mockEmployee.totalTasks) * 100)}%
                  </div>
                  <p className="text-sm text-purple-800">معدل الإنجاز</p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>الإنجازات</CardTitle>
                <CardDescription>إنجازاتك وجوائزك</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}
