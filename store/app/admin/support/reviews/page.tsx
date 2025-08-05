import ReviewList from "@/components/admin/reviews/ReviewList"

export default function AdminReviewPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">مدیریت نظرات کاربران</h1>
      <ReviewList />
    </div>
  )
}