"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, Github, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    message: ""
  })
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  // Check if required fields are filled
  const isFormValid = formData.firstName.trim() !== "" && formData.email.trim() !== "" && formData.message.trim() !== ""

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const fullPhone = countryCode + phoneNumber
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, phone: fullPhone }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })
        // Reset form
        setFormData({
          firstName: "",
          phone: "",
          email: "",
          message: ""
        })
        setCountryCode("+91")
        setPhoneNumber("")
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly at nikhil0653@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background py-8 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border-border backdrop-blur-sm shadow-2xl drop-shadow-lg">
            <CardContent className="p-6 sm:p-8 text-center flex flex-col items-center justify-center">
              {/* Animated Checkmark */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center animate-pulse">
                  <svg 
                    className="w-10 h-10 text-green-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7"
                      className="animate-[draw_0.5s_ease-in-out_0.5s_both] [stroke-dasharray:20] [stroke-dashoffset:20]"
                      style={{
                        animation: 'draw 0.5s ease-in-out 0.5s both'
                      }}
                    />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
                Message Sent!
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto text-center leading-relaxed">
                Thank you for reaching out. I've received your message and will get back to you soon.
              </p>
              
              <Button 
                onClick={() => setIsSubmitted(false)} 
                variant="outline"
                className="bg-background border-border text-foreground hover:bg-muted transition-colors px-6 py-2 h-auto"
              >
                Send Another Message
              </Button>
              
              <style jsx>{`
                @keyframes draw {
                  from {
                    stroke-dashoffset: 20;
                  }
                  to {
                    stroke-dashoffset: 0;
                  }
                }
              `}</style>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-card border-border backdrop-blur-sm contact-card-glow rounded-lg shadow-2xl drop-shadow-lg pb-0">
          <CardContent className="p-4 sm:p-6 md:p-8 md:pt-6 pb-0">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center pt-0 pb-10">
             <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center">
               Hi How's it Going!? {" "}
               <span className="text-muted-foreground font-normal">
                 How can I help?
               </span>
             </h1>
            </div>
            <hr className="border-gray-300 dark:border-border -mx-4 sm:-mx-6 md:-mx-8 mb-10" />

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                 <Label htmlFor="firstName" className="text-foreground text-base font-medium">
                   Name
                 </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="dark:bg-[#0F0F0F] bg-[#FAFAFA] border-border text-foreground placeholder:text-muted-foreground h-10 text-base focus:border-ring rounded-sm"
                  />
                </div>
                <div className="space-y-3">
                 <Label htmlFor="email" className="text-foreground text-base font-medium">
                   Email
                 </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="dark:bg-[#0F0F0F] bg-[#FAFAFA] border-border text-foreground placeholder:text-muted-foreground h-10 text-base focus:border-ring rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
               <Label htmlFor="phone" className="text-foreground text-base font-medium">
                 Phone Number (Optional)
               </Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-20 sm:w-24 md:w-28 dark:bg-[#0F0F0F] bg-[#FAFAFA] border-border text-foreground h-10 text-base focus:border-ring rounded-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectItem value="+1">+1 (US)</SelectItem>
                      <SelectItem value="+91">+91 (IN)</SelectItem>
                      <SelectItem value="+44">+44 (UK)</SelectItem>
                      <SelectItem value="+86">+86 (CN)</SelectItem>
                      <SelectItem value="+49">+49 (DE)</SelectItem>
                      <SelectItem value="+33">+33 (FR)</SelectItem>
                      <SelectItem value="+81">+81 (JP)</SelectItem>
                      <SelectItem value="+7">+7 (RU)</SelectItem>
                      <SelectItem value="+55">+55 (BR)</SelectItem>
                      <SelectItem value="+61">+61 (AU)</SelectItem>
                      <SelectItem value="+39">+39 (IT)</SelectItem>
                      <SelectItem value="+34">+34 (ES)</SelectItem>
                      <SelectItem value="+82">+82 (KR)</SelectItem>
                      <SelectItem value="+52">+52 (MX)</SelectItem>
                      <SelectItem value="+90">+90 (TR)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="flex-1 dark:bg-[#0F0F0F] bg-[#FAFAFA] border-border text-foreground placeholder:text-muted-foreground h-10 text-base focus:border-ring rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
               <Label htmlFor="message" className="text-foreground text-base font-medium">
                 Message
               </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your Message Here..."
                  rows={6}
                  className="dark:bg-[#0F0F0F] bg-[#FAFAFA] border-border text-foreground placeholder:text-muted-foreground text-base resize-none focus:border-ring rounded-sm"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className={`w-full dark:!bg-[#0F0F0F] dark:!text-white dark:!border-zinc-700 bg-white text-black border border-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 h-10 text-base font-medium transition-colors ${
                    isFormValid && !isSubmitting ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  disabled={isSubmitting}
                >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Submit"
                )}
                </Button>
              </div>
            </form>

            {/* Horizontal lines with reduced gap */}
            <hr className="border-gray-300 dark:border-border -mx-4 sm:-mx-6 md:-mx-8 mb-4" />
            <hr className="border-gray-300 dark:border-border -mx-4 sm:-mx-6 md:-mx-8 mb-5" />

            {/* Social Links Section - Restructured for full-section links */}
            <div className="relative mb-[-1rem]">
              {/* Container with 3 equal columns that touch card borders */}
              <div className="flex flex-col md:flex-row -mx-4 sm:-mx-6 md:-mx-8 relative">
                
                {/* X/Twitter Section - Full Section Clickable */}
                <a
                  href="https://x.com/Nikhil0653"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 py-2 cursor-pointer hover:bg-muted/20 transition-colors relative"
                >
                  <div className="bg-zinc-800 p-2.5 rounded-lg mb-3 hover:bg-zinc-700 transition-colors">
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                   <h3 className="text-foreground font-medium text-base mb-1">Follow me on X.</h3>
                   <p className="text-muted-foreground text-base leading-relaxed">
                     Personal updates and creative work.
                   </p>
                  </div>
                </a>

                {/* First Vertical Separator - Extends from top to bottom */}
                <div className="hidden md:block w-px bg-gray-300 dark:bg-border absolute left-1/3 top-[-1.3rem] bottom-[-1rem]"></div>

                {/* Mobile Horizontal Separator */}
                <hr className="md:hidden border-gray-300 dark:border-border mb-4 mt-4" />

                {/* LinkedIn Section - Full Section Clickable */}
                <a
                  href="https://linkedin.com/in/nikhil-choudhary-0653"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 py-2 cursor-pointer hover:bg-muted/20 transition-colors relative"
                >
                  <div className="bg-zinc-800 p-2.5 rounded-lg mb-3 hover:bg-zinc-700 transition-colors">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                   <h3 className="text-foreground font-medium text-base mb-1">Follow me on LinkedIn.</h3>
                   <p className="text-muted-foreground text-base leading-relaxed">
                     Professional updates and networking.
                   </p>
                  </div>
                </a>

                {/* Second Vertical Separator - Extends from top to bottom */}
                <div className="hidden md:block w-px bg-gray-300 dark:bg-border absolute left-2/3 top-[-1.3rem] bottom-[-1rem]"></div>

                {/* Mobile Horizontal Separator */}
                <hr className="md:hidden border-gray-300 dark:border-border mb-4 mt-4" />

                {/* GitHub Section - Full Section Clickable */}
                <a
                  href="https://github.com/NIKHIL0653"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 py-2 mb-8 md:mb-0 cursor-pointer hover:bg-muted/20 transition-colors relative"
                >
                  <div className="bg-zinc-800 p-2.5 rounded-lg mb-3 hover:bg-zinc-700 transition-colors">
                    <Github className="h-6 w-6 text-white" />
                  </div>
                  <div>
                   <h3 className="text-foreground font-medium text-base mb-1">Follow me on Github.</h3>
                   <p className="text-muted-foreground text-base leading-relaxed">
                     Code projects and open source contributions.
                   </p>
                  </div>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}