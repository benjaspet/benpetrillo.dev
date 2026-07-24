export default function Footer() {
  return (
    <footer className="flex w-full justify-center py-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/signature.svg"
        alt="Benjamin S. Petrillo signature"
        width={180}
        height={25}
        className="opacity-70"
      />
    </footer>
  );
}
