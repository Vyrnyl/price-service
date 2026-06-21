import { MdOutlineManageSearch } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function FeaturedSection() {
  return (
    <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <div className="flex-3 rounded-3xl border border-outline-variant bg-white p-8 data-card-shadow">
          <h3 className="mb-6 flex items-center gap-2 font-h3-desktop text-h3-desktop">
            <MdOutlineManageSearch className="text-primary" fontSize={24} />
            Search Prices by Category
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-sm">
            <div className="space-y-2">
              <label className="ml-1 font-label-caps text-label-caps text-on-surface-variant">Commodity</label>
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant bg-surface p-3 outline-none focus:ring-2 focus:ring-primary">
                <option>All Commodities</option>
                <option>Rice (Well-milled)</option>
                <option>Refined Sugar</option>
                <option>Canned Sardines</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="ml-1 font-label-caps text-label-caps text-on-surface-variant">Municipality</label>
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant bg-surface p-3 outline-none focus:ring-2 focus:ring-primary">
                <option>All Municipalities</option>
                <option>Virac</option>
                <option>Bato</option>
                <option>San Andres</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="ml-1 font-label-caps text-label-caps text-on-surface-variant">Store Type</label>
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant bg-surface p-3 outline-none focus:ring-2 focus:ring-primary">
                <option>All Stores</option>
                <option>Public Market</option>
                <option>Supermarket</option>
                <option>Convenience Store</option>
              </select>
            </div>
          </div>
          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-container py-4 font-bold text-on-secondary-container transition-all hover:shadow-md">
            <AiOutlineSearch fontSize={20} />
            Find Best Prices
          </button>
        </div>

        <div className="flex-2 overflow-hidden rounded-3xl border border-outline-variant bg-white p-8 data-card-shadow">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-h3-desktop text-h3-desktop">General Market Trend</h3>
            <span className="flex items-center gap-1 text-xs font-bold text-error">
              <FaArrowTrendUp className="text-sm" />
              +1.2%
            </span>
          </div>
          <div className="relative h-40 w-full">
            <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path
                d="M0 35 Q 10 30, 20 32 T 40 25 T 60 28 T 80 15 T 100 18 L 100 40 L 0 40 Z"
                fill="rgba(0, 74, 198, 0.1)"
              />
              <path
                d="M0 35 Q 10 30, 20 32 T 40 25 T 60 28 T 80 15 T 100 18"
                fill="none"
                stroke="#004ac6"
                strokeWidth="2"
              />
            </svg>
            <div className="mt-2 flex justify-between font-label-caps text-[10px] text-outline">
              <span>MON</span>
              <span>WED</span>
              <span>FRI</span>
              <span>SUN</span>
            </div>
          </div>
          <p className="mt-4 font-body-sm text-body-sm text-on-surface-variant">
            Prices for essential goods have stabilized over the last 72 hours following the arrival of new stocks.
          </p>
        </div>
      </div>
    </section>
  );
}
