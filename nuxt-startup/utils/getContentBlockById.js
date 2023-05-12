import FallbackBlock from "~/components/contentblocks/FallbackBlock.vue";
import HeaderBlock from "~/components/contentblocks/HeaderBlock.vue";
import TekstBlock from "~/components/contentblocks/TekstBlock.vue";
import VideoBlock from "~/components/contentblocks/VideoBlock.vue";

export default function (id) {
  switch (id) {
    case 35:
      return VideoBlock;
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
  51: Cases overzicht
  52: Ons werk overzicht
  57: Medewerkers overzicht
  61: Referentie Slider
  66: Our Culture
*/
