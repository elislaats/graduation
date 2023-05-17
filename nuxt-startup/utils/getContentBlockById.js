import FallbackBlock from "~/components/contentblocks/FallbackBlock.vue";
import HeaderBlock from "~/components/contentblocks/HeaderBlock.vue";
import OverzichtBlock from "~/components/contentblocks/OverzichtBlock.vue";
import TekstBlock from "~/components/contentblocks/TekstBlock.vue";
import VideoBlock from "~/components/contentblocks/VideoBlock.vue";

export default function (id) {
  switch (id) {
    case 35:
      return VideoBlock;
    case 51:
    case 52:
      return OverzichtBlock;
    case 54:
    case 55:
    case 58:
      return TekstBlock;
    case 60:
      return HeaderBlock;
    default:
      return FallbackBlock;
  }
}

/* 
blocks to do:
  50: nieuwsoverzicht
  57: Medewerkers overzicht
  61: Referentie Slider
  66: Our Culture
*/
