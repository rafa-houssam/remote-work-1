"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, ArrowRight, Eye, EyeOff, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    industry: "",
    companyDescription: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    adminPassword: "",
    confirmPassword: "",
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push("/auth/signin?success=account_created")
      } else {
        const errData = await res.json()
        setError(errData?.message || "حدث خطأ أثناء إنشاء الحساب")
      }
    } catch (err) {
      setError("تعذر الاتصال بالخادم")
    } finally {
      setIsLoading(false)
    }
  }

  const isStep1Valid = formData.companyName && formData.companySize && formData.industry
  const isStep2Valid =
    formData.adminName &&
    formData.adminEmail &&
    formData.adminPhone &&
    formData.adminPassword &&
    formData.confirmPassword &&
    formData.adminPassword === formData.confirmPassword
  const isStep3Valid = formData.agreeToTerms

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 space-x-reverse text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            <Building2 className="h-8 w-8" />
            <span>العامل عن بُعد</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
            <CardDescription>ابدأ رحلتك في إدارة العمل عن بُعد</CardDescription>

            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 space-x-reverse mt-6">
              {[1, 2, 3].map(stepNumber => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-600 mt-2">
              {step === 1 && "معلومات الشركة"}
              {step === 2 && "معلومات المدير"}
              {step === 3 && "إنهاء التسجيل"}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>اسم الشركة *</Label>
                  <Input value={formData.companyName} onChange={e => handleInputChange("companyName", e.target.value)} />
                </div>
                <div>
                  <Label>حجم الشركة *</Label>
                  <Select value={formData.companySize} onValueChange={val => handleInputChange("companySize", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر حجم الشركة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 موظفين</SelectItem>
                      <SelectItem value="11-50">11-50 موظف</SelectItem>
                      <SelectItem value="51-200">51-200 موظف</SelectItem>
                      <SelectItem value="201-500">201-500 موظف</SelectItem>
                      <SelectItem value="500+">أكثر من 500 موظف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>القطاع *</Label>
                  <Select value={formData.industry} onValueChange={val => handleInputChange("industry", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر قطاع الشركة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">التكنولوجيا</SelectItem>
                      <SelectItem value="finance">المالية والمصرفية</SelectItem>
                      <SelectItem value="healthcare">الرعاية الصحية</SelectItem>
                      <SelectItem value="education">التعليم</SelectItem>
                      <SelectItem value="retail">التجارة</SelectItem>
                      <SelectItem value="manufacturing">التصنيع</SelectItem>
                      <SelectItem value="consulting">الاستشارات</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>وصف الشركة (اختياري)</Label>
                  <Textarea value={formData.companyDescription} onChange={e => handleInputChange("companyDescription", e.target.value)} />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>اسم المدير *</Label>
                  <Input value={formData.adminName} onChange={e => handleInputChange("adminName", e.target.value)} />
                </div>
                <div>
                  <Label>البريد الإلكتروني *</Label>
                  <Input type="email" value={formData.adminEmail} onChange={e => handleInputChange("adminEmail", e.target.value)} />
                </div>
                <div>
                  <Label>رقم الهاتف *</Label>
                  <Input type="tel" value={formData.adminPhone} onChange={e => handleInputChange("adminPhone", e.target.value)} />
                </div>
                <div>
                  <Label>كلمة المرور *</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.adminPassword}
                      onChange={e => handleInputChange("adminPassword", e.target.value)}
                      className="pl-10"
                    />
                    <Button type="button" variant="ghost" size="sm" className="absolute left-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>تأكيد كلمة المرور *</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={e => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10"
                    />
                    <Button type="button" variant="ghost" size="sm" className="absolute left-0 top-0 h-full px-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.adminPassword !== formData.confirmPassword && (
                    <p className="text-sm text-red-600">كلمات المرور غير متطابقة</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">ملخص التسجيل</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>الشركة:</strong> {formData.companyName}</p>
                    <p><strong>الحجم:</strong> {formData.companySize}</p>
                    <p><strong>القطاع:</strong> {formData.industry}</p>
                    <p><strong>المدير:</strong> {formData.adminName}</p>
                    <p><strong>البريد:</strong> {formData.adminEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox checked={formData.agreeToTerms} onCheckedChange={checked => handleInputChange("agreeToTerms", checked as boolean)} />
                  <Label>أوافق على الشروط والأحكام</Label>
                </div>
              </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              {step > 1 && <Button variant="outline" onClick={handleBack}>السابق</Button>}
              <div className="mr-auto">
                {step < 3 ? (
                  <Button onClick={handleNext} disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}>
                    التالي
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!isStep3Valid || isLoading}>
                    {isLoading ? "جاري التسجيل..." : "إنشاء الحساب"}
                  </Button>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm">
                لديك حساب بالفعل؟ <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700">تسجيل الدخول</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
