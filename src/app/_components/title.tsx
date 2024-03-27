import clsx from "clsx";
import Link from "next/link";

export function Title({ className }: { className?: string }) {
  return (
    <h1
      className={clsx(
        "text-5xl font-extrabold tracking-tight sm:text-[5rem]",
        className,
      )}
    >
      <Link href="/">
        Pokemon <span className="text-c-red">G</span>
        <span className="text-c-red">Y</span>
        <span className="text-c-red">M</span> Tracker (.)
      </Link>
    </h1>
  );
}
