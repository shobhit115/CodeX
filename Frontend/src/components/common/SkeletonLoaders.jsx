import React from "react";
import Skeleton from "./Skeleton";

// Admin Event Card Skeleton
export const EventCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 flex-1 flex flex-col gap-4">
      <Skeleton className="h-6 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <div className="space-y-2 mt-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>
      <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  </div>
);

// Public Event Card Skeleton
export const PublicEventCardSkeleton = () => (
  <div className="bg-white rounded-[2rem] border-2 border-gray-200 p-4 flex flex-col md:flex-row gap-8 shadow-sm">
    <Skeleton className="w-full md:w-[320px] h-[220px] shrink-0 rounded-3xl" />
    <div className="flex-1 flex flex-col justify-center py-2 pr-4">
      <Skeleton className="h-5 w-20 rounded-full mb-3" />
      <Skeleton className="h-8 w-3/4 rounded-lg mb-4" />
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="w-12 h-12 rounded-xl" />
      </div>
    </div>
  </div>
);

// Team Card Skeleton
export const AdminTeamCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
    <Skeleton className="h-56 w-full rounded-none" />
    <div className="p-5 flex-1 flex flex-col gap-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-1/3 mt-1" />
      <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  </div>
);

export const PublicTeamCardSkeleton = () => (
  <div className="w-full sm:w-[280px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
    <Skeleton className="w-16 h-16 rounded-full shrink-0" />
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  </div>
);

// FAQ Skeleton
export const FaqSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start gap-6">
    <div className="flex-1 w-full gap-3 flex flex-col">
      <div className="flex gap-3 items-center">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
    <div className="flex gap-2 shrink-0">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  </div>
);

// Session Card Skeleton
export const SessionCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    <div className="flex items-start gap-4 w-full">
      <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
    <Skeleton className="h-10 w-full md:w-32 rounded-lg shrink-0" />
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = () => (
  <tr>
    <td className="px-6 py-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-48" />
      </div>
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-6 w-32 rounded" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="h-6 w-20 rounded-full" />
    </td>
    <td className="px-6 py-4">
      <div className="flex justify-end gap-2">
        <Skeleton className="h-7 w-7 rounded-md" />
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
    </td>
  </tr>
);
