import { twMerge } from 'tailwind-merge';

export default function twJoin(...args: any[]) {
  return twMerge(args.filter(Boolean).join(' '));
}
