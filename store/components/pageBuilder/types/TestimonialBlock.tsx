import { Element } from "@/types/pageBuilder";
import { User } from "lucide-react"; // آیکن کاربر از lucide-react

export default function TestimonialBlock({ element }: { element: Element }) {
  return (
    <div className="space-y-4 my-6">
      {element.items.map((item) => {
        const testimonial = item.object;
        if (!testimonial) return null;

        return (
          <div key={item.id} className="p-4 rounded bg-gray-50 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              <p className="font-bold">{testimonial.author || "Anonymous"}</p>
            </div>
            <p className="italic text-gray-800">"{testimonial.comment || "No comment"}"</p>
          </div>
        );
      })}
    </div>
  );
}
