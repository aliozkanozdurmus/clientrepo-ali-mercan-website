"use client";

import { useEffect, useState } from "react";
import { Navigation } from "./navigation";
import { MobileNavigation } from "./mobile-navigation";

export function ResponsiveNavigation() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile ? <MobileNavigation /> : <Navigation />;
}
