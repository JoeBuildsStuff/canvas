const COLORS = [
  "background",
  "foreground",
  "sidebar-ring",
  "sidebar-border",
  "sidebar-accent-foreground",
  "sidebar-accent",
  "sidebar-primary-foreground",
  "sidebar-primary",
  "sidebar-foreground",
  "sidebar",
  "chart-5",
  "chart-4",
  "chart-3",
  "chart-2",
  "chart-1",
  "ring",
  "input",
  "border",
  "destructive",
  "accent-foreground",
  "accent",
  "muted-foreground",
  "muted",
  "secondary-foreground",
  "secondary",
  "primary-foreground",
  "primary",
  "popover-foreground",
  "popover",
  "card-foreground",
  "card",
];

export default function ColorsPage() {
  return (
    <div className="p-8 min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col gap-2">
        {COLORS.map((color) => (
          <div key={color} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded border border-foreground bg-${color}`}
              // fallback style for unknown tailwind classes
              style={{ backgroundColor: `var(--${color})` }}
            />
            <span className="text-sm font-mono">color-{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}