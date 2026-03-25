export function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large circle - top right */}
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 animate-float"
        style={{ animationDelay: "0s" }}
      />

      {/* Medium circle - left center */}
      <div
        className="absolute -left-10 top-1/3 h-48 w-48 rounded-full bg-accent/5 animate-float-delayed"
        style={{ animationDelay: "1s" }}
      />

      {/* Small circle - bottom right */}
      <div
        className="absolute bottom-20 right-1/4 h-32 w-32 rounded-full bg-secondary/5 animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Extra small circle - top center */}
      <div
        className="absolute left-1/2 top-1/4 h-24 w-24 rounded-full bg-primary/5 animate-float-delayed"
        style={{ animationDelay: "3s" }}
      />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
    </div>
  );
}
