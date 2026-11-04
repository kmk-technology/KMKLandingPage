import type { Product } from "../../content/site";
import type { L } from "../../i18n/context";
import { tiles } from "./tiles";

/** A photo of each product in use (16:9). */
const productPhotos: Record<string, { src: string; alt: L }> = {
  medifam: {
    src: "/products/photo-medifam.webp",
    alt: {
      vi: "Bác sĩ cùng bệnh nhân xem lịch khám trên Medifam",
      en: "A doctor and her patient checking appointments on Medifam",
    },
  },
  "kmk-sales": {
    src: "/products/photo-kmk-sales.webp",
    alt: {
      vi: "Chủ cửa hàng vui mừng xem doanh thu trên KMK Sales",
      en: "A shop owner cheering at the day's revenue on KMK Sales",
    },
  },
  "digital-info": {
    src: "/products/photo-digital-info.webp",
    alt: {
      vi: "Hai đồng nghiệp xem quy trình phê duyệt tự động và báo cáo do trợ lý AI tạo",
      en: "Two colleagues reviewing an automated approval workflow and an AI-made report",
    },
  },
};

/**
 * The picture of a product: its photo, otherwise its name on a soft blue tile.
 */
export default function ProductArt({
  p,
  index = 0,
  vi,
}: {
  p: Product;
  index?: number;
  vi: boolean;
}) {
  const photo = productPhotos[p.key];
  if (photo)
    return (
      <img
        src={photo.src}
        alt={vi ? photo.alt.vi : photo.alt.en}
        width={1672}
        height={941}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  return (
    <div
      aria-hidden="true"
      className={`grid h-full w-full place-items-center ${tiles[index % tiles.length]}`}
    >
      <span className="px-6 text-center font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.8rem)] font-normal text-brand">
        {p.name}
      </span>
    </div>
  );
}
