// components/footer/Footer.tsx
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* لوگو و توضیح کوتاه */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/images/store-logo.png" alt="لوگوی فروشگاه" width={140} height={50} />
          <p className="mt-4 text-sm leading-relaxed text-center md:text-right text-gray-400">
            فروشگاه ما با ارائه بهترین محصولات و خدمات، همیشه همراه شماست.
          </p>
        </div>

        {/* آدرس فروشگاه */}
        <div>
          <h4 className="font-bold mb-3 text-gray-100">آدرس فروشگاه</h4>
          <p>خیابان آزادی، پلاک ۱۲۳، تهران، ایران</p>
          <p>کد پستی: ۱۴۱۷۵۳۳۳</p>
          <p>ایمیل: <a href="mailto:support@shop.com" className="text-blue-400 hover:underline">support@shop.com</a></p>
        </div>

        {/* پشتیبانی */}
        <div>
          <h4 className="font-bold mb-3 text-gray-100">پشتیبانی</h4>
          <p>تلفن: <a href="tel:+982122334455" className="text-blue-400 hover:underline">۰۲۱-۲۲۳۳۴۴۵۵</a></p>
          <p>واتساپ: <a href="https://wa.me/989123456789" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">+۹۸۹۱۲۳۴۵۶۷۸۹</a></p>
          <p>ساعات کاری: ۹ صبح تا ۵ عصر (شنبه تا چهارشنبه)</p>
        </div>

        {/* شبکه‌های اجتماعی و نماد اعتماد */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold mb-3 text-gray-100">شبکه‌های اجتماعی</h4>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <a href="https://instagram.com/yourstore" target="_blank" rel="noreferrer" aria-label="اینستاگرام" className="text-pink-500 hover:text-pink-700 text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://telegram.me/yourstore" target="_blank" rel="noreferrer" aria-label="تلگرام" className="text-blue-500 hover:text-blue-700 text-2xl">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="https://twitter.com/yourstore" target="_blank" rel="noreferrer" aria-label="توییتر" className="text-blue-400 hover:text-blue-600 text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com/yourstore" target="_blank" rel="noreferrer" aria-label="فیسبوک" className="text-blue-700 hover:text-blue-900 text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
          </div>

          <div className="mt-6 flex items-center gap-6">
            <a href="https://trustseal.enamad.ir" target="_blank" rel="noreferrer" title="نماد اعتماد الکترونیکی">
              <Image
                src="/images/enamad-logo.png"
                alt="نماد اعتماد الکترونیکی"
                width={90}
                height={90}
                className="object-contain"
              />
            </a>
            <Image
              src="/images/another-logo.png"
              alt="لوگوی فروشگاه"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} تمامی حقوق این سایت محفوظ است.
      </div>
    </footer>
  );
}
