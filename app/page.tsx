"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Briefcase, CheckCircle, Clock, FileText, Shield, Zap, Globe } from 'lucide-react'
import { useRouter } from "next/navigation"

// Custom hook for number animation
function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!shouldStart || hasStarted) return

    setHasStarted(true)
    let startTime: number
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startCount + (end - startCount) * easeOutQuart)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, shouldStart, hasStarted])

  return count
}

// Intersection Observer hook
function useInView(threshold = 0.3) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView] as const
}

export default function LandingPage() {
  const router = useRouter()
  const [statsRef, statsInView] = useInView(0.3)

  const features = [
    {
      icon: Users,
      title: "إدارة الفرق",
      description: "إدارة شاملة للموظفين والفرق مع تتبع الأداء والحضور"
    },
    {
      icon: Briefcase,
      title: "إدارة المهام",
      description: "تعيين وتتبع المهام مع حالات مختلفة ونظام إشعارات متقدم"
    },
    {
      icon: FileText,
      title: "مشاركة الملفات",
      description: "نظام آمن لرفع ومشاركة الملفات بين أعضاء الفريق"
    },
    {
      icon: Clock,
      title: "تتبع الوقت",
      description: "مراقبة ساعات العمل والحضور والانصراف تلقائياً"
    },
    {
      icon: Shield,
      title: "الأمان والخصوصية",
      description: "حماية عالية للبيانات مع صلاحيات متدرجة للمستخدمين"
    },
    {
      icon: Globe,
      title: "الوصول من أي مكان",
      description: "منصة سحابية تتيح العمل من أي مكان وفي أي وقت"
    }
  ]

  const stats = [
    { number: 500, label: "شركة تثق بنا", suffix: "+" },
    { number: 10000, label: "موظف نشط", suffix: "+" },
    { number: 99.9, label: "وقت التشغيل", suffix: "%" },
    { number: 24, label: "دعم فني", suffix: "/7" }
  ]

  // Animated counters
  const count1 = useCountUp(500, 2000, statsInView)
  const count2 = useCountUp(10000, 2500, statsInView)
  const count3 = useCountUp(99.9, 2000, statsInView)
  const count4 = useCountUp(24, 1500, statsInView)

  const animatedCounts = [count1, count2, count3, count4]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
              العامل عن بُعد
            </span>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <Button 
              variant="outline" 
              onClick={() => router.push("/auth/signin")}
              className="font-semibold border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
            >
              تسجيل الدخول
            </Button>
            <Button 
              onClick={() => router.push("/auth/signup")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              إنشاء حساب
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
        
        <div className="container mx-auto text-center relative">
          <div className="max-w-5xl mx-auto space-y-10">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-tight tracking-tight">
              منصة العمل عن بُعد
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mt-2">
                الأكثر تطوراً
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              إدارة شاملة للفرق والمشاريع عن بُعد مع أدوات متقدمة لتتبع الأداء والإنتاجية. 
              ابدأ رحلتك نحو مستقبل العمل الرقمي اليوم.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button 
                size="lg" 
                onClick={() => router.push("/auth/signup")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg px-10 py-4 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                ابدأ التجربة الآن
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push("/auth/signin")}
                className="text-lg px-10 py-4 font-semibold border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 rounded-xl"
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/40 backdrop-blur-sm" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-3 transition-all duration-300 group-hover:scale-110">
                  {index === 2 ? animatedCounts[index].toFixed(1) : animatedCounts[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-slate-600 font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              ميزات متقدمة لإدارة العمل عن بُعد
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
              كل ما تحتاجه لإدارة فريقك بكفاءة وفعالية من مكان واحد
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/70 backdrop-blur-sm hover:-translate-y-2 group">
                <CardHeader className="text-center pb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              جاهز لتحويل طريقة عمل فريقك؟
            </h2>
            <p className="text-xl md:text-2xl opacity-90 font-medium leading-relaxed">
              انضم إلى آلاف الشركات التي تستخدم منصتنا لإدارة فرقها عن بُعد بنجاح
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => router.push("/auth/signup")}
                className="text-lg px-10 py-4 font-bold bg-white text-blue-600 hover:bg-slate-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                ابدأ التجربة
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-10 py-4 font-semibold border-2 border-white/30 text-black hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-200 rounded-xl"
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">العامل عن بُعد</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                منصة شاملة لإدارة العمل عن بُعد وتطوير الإنتاجية
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">المنتج</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">الميزات</li>
                <li className="hover:text-white transition-colors cursor-pointer">الأسعار</li>
                <li className="hover:text-white transition-colors cursor-pointer">الأمان</li>
                <li className="hover:text-white transition-colors cursor-pointer">التحديثات</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">الشركة</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">من نحن</li>
                <li className="hover:text-white transition-colors cursor-pointer">المدونة</li>
                <li className="hover:text-white transition-colors cursor-pointer">الوظائف</li>
                <li className="hover:text-white transition-colors cursor-pointer">اتصل بنا</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">الدعم</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">مركز المساعدة</li>
                <li className="hover:text-white transition-colors cursor-pointer">الدعم الفني</li>
                <li className="hover:text-white transition-colors cursor-pointer">الشروط والأحكام</li>
                <li className="hover:text-white transition-colors cursor-pointer">سياسة الخصوصية</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 العامل عن بُعد. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
