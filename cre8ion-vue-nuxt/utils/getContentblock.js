import ContentblockOverzicht from "~/components/contentblock/overzicht";
import ContentblockFallback from "~/components/contentblock/fallback";
import ContentblockHeader from "~/components/contentblock/header";
import ContentblockTitel from "~/components/contentblock/titel";
import ContentblockTekst from "~/components/contentblock/tekst";

export default function (id) {
  switch (id) {
    case 50:
    case 51:
    case 52:
    case 57:
    case 71:
      return ContentblockOverzicht;
    case 33:
    case 54:
    case 58:
      return ContentblockTekst;
    case 70:
      return ContentblockTitel;
    case 60:
      return ContentblockHeader;
    default:
      return ContentblockFallback;
  }
}
