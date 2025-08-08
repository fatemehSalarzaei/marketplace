import ReviewList from "@/components/reviews/ReviewList";

export default function ReviewsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-6">لیست نظرات کاربران</h1>
      <ReviewList />
    </div>
  );
}
