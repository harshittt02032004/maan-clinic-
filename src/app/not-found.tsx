import Link from "next/link";
import { LogoMark } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <LogoMark size={96} className="opacity-60" />
      <h1 className="mt-4 text-4xl font-extrabold text-navy-900">This page doesn't exist.</h1>
      <p className="mt-3 max-w-md text-muted">The link may be old or mistyped. Everything on the site is one click away from the home page.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/conditions/" className="btn-ghost">See conditions</Link>
      </div>
    </section>
  );
}
