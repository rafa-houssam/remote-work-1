"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, FileText, Trash2, Eye } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmployeeLayout from "@/components/employee-layout"

const mockFiles = [
  {
    id: 1,
    name: "متطلبات-المشروع.pdf",
    size: "2.4 ميجابايت",
    uploadedAt: "2024-01-15 10:30:00",
    type: "pdf"
  },
  {
    id: 2,
    name: "تصاميم-الواجهة.zip",
    size: "15.2 ميجابايت",
    uploadedAt: "2024-01-14 14:20:00",
    type: "zip"
  },
  {
    id: 3,
    name: "مراجعة-الكود.docx",
    size: "1.8 ميجابايت",
    uploadedAt: "2024-01-13 09:15:00",
    type: "docx"
  },
  {
    id: 4,
    name: "لقطات-الشاشة.png",
    size: "3.2 ميجابايت",
    uploadedAt: "2024-01-12 16:45:00",
    type: "png"
  }
]

export default function FilesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("File uploaded:", selectedFile.name)
    setSelectedFile(null)
    setIsUploading(false)
    
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-blue-600" />
  }

  const formatFileSize = (size: string) => {
    return size
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الملفات</h1>
          <p className="text-gray-600">رفع وإدارة ملفات المشروع</p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>رفع ملف جديد</CardTitle>
            <CardDescription>قم برفع الملفات المتعلقة بمهامك ومشاريعك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    انقر للرفع
                  </span>
                  <span className="text-gray-600"> أو اسحب الملف هنا</span>
                </Label>
                <Input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg,.txt"
                />
                <p className="text-sm text-gray-500">
                  PDF, DOC, ZIP, PNG, JPG - حتى 50 ميجابايت
                </p>
              </div>
            </div>

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">{selectedFile.name}</p>
                      <p className="text-sm text-blue-700">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} ميجابايت
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button 
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isUploading ? "جاري الرفع..." : "رفع الملف"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedFile(null)}
                      disabled={isUploading}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
                {isUploading && (
                  <div className="mt-3">
                    <div className="bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Files List */}
        <Card>
          <CardHeader>
            <CardTitle>ملفاتي</CardTitle>
            <CardDescription>جميع الملفات التي قمت برفعها</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم الملف</TableHead>
                  <TableHead className="text-right">الحجم</TableHead>
                  <TableHead className="text-right">تاريخ الرفع</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="flex items-center space-x-3 space-x-reverse">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{file.type}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(file.size)}</TableCell>
                    <TableCell>
                      {new Date(file.uploadedAt).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
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
      </div>
    </EmployeeLayout>
  )
}
