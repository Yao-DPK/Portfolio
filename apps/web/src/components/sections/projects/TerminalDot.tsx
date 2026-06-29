// components/projects/TerminalDot.tsx

export function TerminalDot({ color }: { color: string }) {
  return <span className={`w-2.5 h-2.5 rounded-full ${color} inline-block`} />;
}