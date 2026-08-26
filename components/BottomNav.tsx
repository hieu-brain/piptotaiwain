"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/config";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t-[1.5px] border-sand bg-card">
      <div className="mx-auto flex w-full max-w-[430px] px-1 pt-2.5 pb-[max(22px,env(safe-area-inset-bottom))]">
        {NAV.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="flex flex-1 items-center justify-center select-none"
            >
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs ${
                  active
                    ? "bg-sea font-bold text-ink"
                    : "font-medium text-ink-soft"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
