export default function PriceCard({
  title,
  subtitle,
  price,
  href,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center relative ${className}`}
    >
      <div className="flex flex-col gap-2 text-primary">
        <h2 className="lg:text-2xl xl:text-3xl text-3xl font-bold italic">
          {title}
          <br className="md:hidden" />
          <span className="text-darkPink md:before:content-['-$']">
            {price}
          </span>
        </h2>
        <p className="lg:text-base md:white-space-pre-line">{subtitle}</p>
      </div>

      <a
        href={href}
        className="darkPink px-7 py-3 rounded-full text-lg shadow-2xl"
      >
        Reserve
      </a>

      <div className="md:hidden absolute -bottom-10 w-full bg-primary h-px"></div>
    </div>
  );
}
