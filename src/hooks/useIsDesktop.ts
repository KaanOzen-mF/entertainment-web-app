// src/hooks/useIsDesktop.ts

"use client"; // Bu hook, tarayıcıya özel 'window' objesini kullanacağı için client-side olmalı.

import { useState, useEffect } from "react";

const useIsDesktop = (breakpoint = 768) => {
  // 768px (md) varsayılan breakpoint
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Bu fonksiyon, mevcut ekran genişliğini kontrol edip state'i günceller.
    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    // 1. Bileşen ilk yüklendiğinde durumu doğru ayarlamak için fonksiyonu çağır.
    handleResize();

    // 2. Ekran boyutu her değiştiğinde fonksiyonun tekrar çalışması için bir 'event listener' ekle.
    window.addEventListener("resize", handleResize);

    // 3. Bileşen ekrandan kaldırıldığında (cleanup), hafızada sızıntı olmaması için event listener'ı kaldır.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]); // Sadece breakpoint değişirse bu effect'i tekrar çalıştır.

  return isDesktop;
};

export default useIsDesktop;
