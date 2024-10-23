import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper mt-10"
      >
        <SwiperSlide>
          <img
            src="https://www.clopaydoor.com/images/default-source/product-images/showcase-images/modern-steel-plank-kona.tmb-medium.webp?Culture=en&sfvrsn=952e3bd4_8"
            loading="lazy"
          />
          <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-500 bg-white">
            <h1 className="text-gray-800 text-lg">
              Modern Steel™ Ultra-Grain® Plank
            </h1>
            <p className="font-normal text-[16px]">
              Rustic meets modern on this unique flush panel Modern Steel door
              design featuring digitally printed horizontal planks with a
              stained wood-look appearance. The planks vary in length for a
              woven look with no repeating grain pattern.
            </p>
            <div className="font-normal text-[13px] flex items-center gap-2">
              <p>Also in :</p>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-warmBrown mt-1"></div>
                <div className="w-3 h-3 rounded-full bg-darkRed mt-1"></div>
              </div>
              <span>+4</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.clopaydoor.com/images/default-source/product-images/showcase-images/vertistackclear.tmb-medium.webp?Culture=en&sfvrsn=7b554cac_4"
            loading="lazy"
          />
          <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-500 bg-white">
            <h1 className="text-gray-800 text-lg">VertiStack® Clear Door</h1>
            <p className="font-normal text-[16px]">
              VertiStack® Clear allows you to bring the outside in. These
              compact, vertically stacked sections take up minimal ceiling space
              so it won’t interfere with mechanical, electrical or plumbing
              fixtures.
            </p>
            <div className="font-normal text-[13px] flex items-center gap-2">
              <p>Also in :</p>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-warmBrown mt-1"></div>
                <div className="w-3 h-3 rounded-full bg-darkRed mt-1"></div>
              </div>
              <span>+4</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.clopaydoor.com/images/default-source/product-images/showcase-images/cre-d12-rec13-01595.tmb-medium.webp?Culture=en&sfvrsn=a5326927_10"
            loading="lazy"
          />
          <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-500 bg-white">
            <h1 className="text-gray-800 text-lg">Canyon Ridge® Elements</h1>
            <p className="font-normal text-[16px]">
              A modern update to our traditional carriage house door, Canyon
              Ridge Elements pairs textured overlays with clean, square edges
              and durable insulated steel to give you the look of painted wood
              without the upkeep.
            </p>
            <div className="font-normal text-[13px] flex items-center gap-2">
              <p>Also in :</p>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-100 mt-1"></div>
                <div className="w-3 h-3 rounded-full bg-pink-200 mt-1"></div>
              </div>
              <span>+5</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.clopaydoor.com/images/default-source/product-images/garage-doors/gallerysteel/normal/gallery-steel-ug-long-rec14-822.tmb-medium.webp?Culture=en&sfvrsn=3eb6b5f1_3"
            loading="lazy"
          />
          <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-500 bg-white">
            <h1 className="text-gray-800 text-lg">Gallery® Steel</h1>
            <p className="font-normal text-[16px]">
              We’ve taken the iconic raised panel steel garage door and given it
              a vintage feel by adding a grooved panel design, optional windows,
              and many unique color choices, including our Ultra-Grain®
              wood-look and Lustra™ matte finishes.
            </p>
            <div className="font-normal text-[13px] flex items-center gap-2">
              <p>Also in :</p>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-200 mt-1"></div>
                <div className="w-3 h-3 rounded-full bg-orange-200 mt-1"></div>
              </div>
              <span>+16</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.clopaydoor.com/images/default-source/product-images/garage-doors/bridgeportsteel/normal/bridgeport3lugdark-closeup.tmb-medium.webp?Culture=en&sfvrsn=2a7e1ba1_1"
            loading="lazy"
          />
          <div className="text-start py-3 px-2 flex flex-col gap-7 border border-gray-500 bg-white">
            <h1 className="text-gray-800 text-lg">Bridgeport™ Steel</h1>
            <p className="font-normal text-[16px]">
              Travel back to simpler times and symmetry found in traditional
              stile and rail recessed panel doors —updated in a durable, stylish
              steel construction. Go retro with a long panel profile or add
              modern flair to your home with a narrow vertical panel design.
            </p>
            <div className="font-normal text-[13px] flex items-center gap-2">
              <p>Also in :</p>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-100 mt-1"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-100 mt-1"></div>
              </div>
              <span>+16</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
