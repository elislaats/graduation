import ContentblockOverzicht from "~/components/contentblock/overzicht";
import ContentblockFallback from "~/components/contentblock/fallback";
import ContentblockHeader from "~/components/contentblock/header";

export default function (id) {
  switch (id) {
    case 51:
    case 52:
    case 57:
    case 71:
      return ContentblockOverzicht;
    case 60:
      return ContentblockHeader;
    default:
      return ContentblockFallback;
  }
}
