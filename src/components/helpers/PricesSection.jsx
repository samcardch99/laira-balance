import { useEffect, useState } from "react";
import { sanityClient } from "sanity:client";
import PriceCard from "./PriceCard";

const PRICES_QUERY = `*[_type == "clases"]{
  _id,
    title,
    "subtitle": subtitle[0].children[0].text,
    price,

}`;
export default function PricesSection() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(PRICES_QUERY)
      .then((data) => setPrices(data))
      .catch(console.error);
  }, []);

  return (
    <section
      id="about_prices"
      className="w-full min-h-[90vh] relative content-center"
    >
      <div className="px-16 xl:px-32 pt-32 pb-20 md:py-0 md:my-32 grid justify-center place-items-center grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-20 md:gap-16">
        <div className="flex w-full gap-4 -ml-4 md:ml-0">
          <h1 className="font-bold italic text-6xl lg:text-8xl text-primary">
            Prices
          </h1>
          <svg
            id="Capa_2"
            data-name="Capa 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 41.91 32.38"
            className="hidden md:block h-8 self-center"
          >
            <g id="Capa_1-2" data-name="Capa 1">
              <g>
                <line
                  x1="40.53"
                  y1="16.19"
                  x2={1}
                  y2="16.19"
                  style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />
                <polyline
                  points="25.71 1 40.91 16.19 25.71 31.38"
                  style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                  }}
                />
              </g>
            </g>
          </svg>
        </div>
        {(!prices || prices.length === 0) && (
          <p className="text-center text-primary">
            No hay clases disponibles en este momento.
          </p>
        )}
        {prices.map((price, index) => {
          return (
            <>
              {index % 2 === 0 && (
                <div className="hidden md:block w-px bg-primary h-full" />
              )}
              <PriceCard
                title={price.title}
                price={price.price}
                subtitle={price.subtitle}
                href="/schedule#schedule_widget"
                className="w-full"
              />

              {index % 2 === 0 && index < prices.length - 1 && (
                <div className="hidden md:block col-span-1 md:col-span-3 h-px bg-primary w-full" />
              )}
            </>
          );
        })}
      </div>
    </section>
  );
}
