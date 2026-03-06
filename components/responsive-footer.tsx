"use client";

import { useEffect, useState } from "react";
import { Footer } from "./footer";
import { MobileFooter } from "./mobile-footer";

export function ResponsiveFooter() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile ? <MobileFooter /> : <Footer />;
}
