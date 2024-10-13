"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function Layout({
  children,
  filter,
}: {
  children: React.ReactNode;
  filter: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const isFilterOpen = searchParams.get("filter") === "open"; //filterpage를 조건부로 렌더링하기 위함

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
      {isFilterOpen && filter}
    </Suspense>
  );
}
