export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1416px] px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
