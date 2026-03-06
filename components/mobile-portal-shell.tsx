"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type MobilePortalShellProps = {
  children: ReactNode;
};

export function MobilePortalShell({ children }: MobilePortalShellProps) {
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("portal-open");
    };
  }, []);

  const close = () => {
    document.documentElement.classList.remove("portal-open");
  };

  return (
    <>
      <div className="mobile-portal-backdrop" onClick={close} />
      <div className="mobile-portal-drawer" aria-label="Bilgi Portalı">
        {children}
      </div>
    </>
  );
}
