"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star } from "lucide-react"

interface ReviewModalProps {
  children: React.ReactNode
}

export default function ReviewModal({ children }: ReviewModalProps) {
  const [open, setOpen] = useState(false)
  const [overallRating, setOverallRating] = useState(0)
  const [workLifeRating, setWorkLifeRating] = useState(0)
  const [cultureRating, setCultureRating] = useState(0)
  const [salaryRating, setSalaryRating] = useState(0)
  const [managementRating, setManagementRating] = useState(0)

  const StarRating = ({
    rating,
    setRating,
    label,
  }: { rating: number; setRating: (rating: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => setRating(star)} className="p-1">
            <Star
              className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
          </button>
        ))}
      </div>
    </div>
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Review submitted")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <StarRating rating={overallRating} setRating={setOverallRating} label="Overall Rating *" />

          {/* Detailed Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StarRating rating={workLifeRating} setRating={setWorkLifeRating} label="Work-Life Balance" />
            <StarRating rating={cultureRating} setRating={setCultureRating} label="Culture & Values" />
            <StarRating rating={salaryRating} setRating={setSalaryRating} label="Salary & Benefits" />
            <StarRating rating={managementRating} setRating={setManagementRating} label="Management" />
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobRole">Job Role *</Label>
              <Input id="jobRole" placeholder="e.g. Software Engineer" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment">Employment Status *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Employee</SelectItem>
                  <SelectItem value="former">Former Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Annual Salary (Optional)</Label>
              <Input id="salary" placeholder="e.g. $80,000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. San Francisco, CA" />
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pros">Pros *</Label>
              <Textarea
                id="pros"
                placeholder="What are the best things about working at this company?"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cons">Cons *</Label>
              <Textarea
                id="cons"
                placeholder="What could be improved about this company?"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advice">Advice to Management (Optional)</Label>
              <Textarea id="advice" placeholder="What advice would you give to management?" className="min-h-[80px]" />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Submit Review
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
