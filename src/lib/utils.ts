import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatting for Bahrain (BHD)
export function formatCurrencyBHD(amount: number) {
  try {
    return new Intl.NumberFormat('en-BH', {
      style: 'currency',
      currency: 'BHD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(Number(amount) || 0);
  } catch {
    // Fallback if Intl not available in some environments
    const val = (Number(amount) || 0).toFixed(3);
    return `BHD ${val}`;
  }
}

// Currency formatting for India (INR)
export function formatCurrencyINR(amount: number) {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  } catch {
    // Fallback if Intl not available in some environments
    const val = (Number(amount) || 0).toFixed(2);
    return `₹${val}`;
  }
}
