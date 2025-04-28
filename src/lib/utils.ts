import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Item } from "../db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBidOver(item: Item) {
  return item.endDate < new Date();
}