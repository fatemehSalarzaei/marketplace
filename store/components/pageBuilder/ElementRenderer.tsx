import { Element } from "@/types/pageBuilder/pageBuilder";
import ProductGrid from "./types/ProductGrid";
import BannerCarousel from "./types/BannerCarousel";
import HtmlBlock from "./types/HtmlBlock";
import TextBlock from "./types/TextBlock";
import ProductHighlight from "./types/ProductHighlight";
import VideoBlock from "./types/VideoBlock";
import GalleryBlock from "./types/GalleryBlock";
import TestimonialBlock from "./types/TestimonialBlock";
import CategoryList from "./types/CategoryList";
import Accordion from "./types/Accordion";
import Carousel from "./types/Carousel";
import Countdown from "./types/Countdown";
import List from "./types/List";
import Masonry from "./types/Masonry";
import Slider from "./types/Slider";
import Tabs from "./types/Tabs";
import Banner from "./types/Banner";

export default function ElementRenderer({ element }: { element: Element }) {
  switch (element.display_style) {
    case "grid":
      return <ProductGrid element={element} />;
    case "slider":
      return <Slider element={element} />;
    case "carousel":
      return <BannerCarousel element={element} />;
    case "html":
      return <HtmlBlock html={element.html_content || ""} />;
    case "text":
      return <TextBlock element={element} />;
    case "product_highlight":
      return <ProductHighlight element={element} />;
    case "video":
      return <VideoBlock element={element} />;
    case "gallery":
      return <GalleryBlock element={element} />;
    case "countdown":
      return <Countdown element={element} />;
    case "testimonial":
      return <TestimonialBlock element={element} />;
    case "category_list":
      return <CategoryList element={element} />;
    case "tabs":
      return <Tabs element={element} />;
    case "accordion":
      return <Accordion element={element} />;
    case "list":
      return <List element={element} />;
    case "masonry":
      return <Masonry element={element} />;
    case "banner":
      return <Banner element={element} />;
    default:
      return <div>نوع ناشناخته: {element.display_style}</div>;
  }
}
