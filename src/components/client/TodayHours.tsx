"use client";

import { useSyncExternalStore } from "react";
import type { OpeningHours } from "@/config/clinic";
import { formatTime, hoursForDay, todayInBrazil } from "@/lib/hours";

const subscribe = () => () => {};

/** "Hoje: 8h às 18h". Calculado só no navegador para não divergir do HTML do servidor. */
export function TodayHours({ hours }: { hours: OpeningHours[] }) {
  const label = useSyncExternalStore(
    subscribe,
    () => {
      const today = hoursForDay(hours, todayInBrazil());
      return today ? `Hoje: ${formatTime(today.opens)} às ${formatTime(today.closes)}` : "Hoje: fechado";
    },
    () => "Horários de atendimento",
  );
  return <>{label}</>;
}
