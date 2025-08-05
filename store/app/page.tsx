import { fetchHomeElements } from "@/services/pageBuilder/home";
import ElementRenderer from "@/components/pageBuilder/ElementRenderer";

export default async function HomePage() {
  const elements = await fetchHomeElements();

  return (
    <main className="px-4">
      {["header", "middle", "footer"].map((section) => (
        <div key={section}>
          {elements
            .filter((el) => el.section === section)
            .map((element) => (
              <ElementRenderer key={element.id} element={element} />
            ))}
        </div>
      ))}
    </main>
  );
}
