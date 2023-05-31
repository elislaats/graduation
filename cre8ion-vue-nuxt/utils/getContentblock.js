import ContentblockFallback from "~/components/contentblock/fallback";
import ContentblockHeader from "~/components/contentblock/header";

export default function (id) {
  switch (id) {
    case 60:
      return ContentblockHeader;
    default:
      return ContentblockFallback;
  }
}
