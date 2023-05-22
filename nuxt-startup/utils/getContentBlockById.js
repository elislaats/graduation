import OverzichtCases from "~/components/contentblocks/OverzichtCases.vue";
import FallbackBlock from "~/components/contentblocks/FallbackBlock.vue";
import HeaderBlock from "~/components/contentblocks/HeaderBlock.vue";
import TekstBlock from "~/components/contentblocks/TekstBlock.vue";
import VideoBlock from "~/components/contentblocks/VideoBlock.vue";
import OverzichtWerk from "~/components/contentblocks/OverzichtWerk.vue";
import OverzichtMedewerkers from "~/components/contentblocks/OverzichtMedewerkers.vue";
import OverzichtNiews from "~/components/contentblocks/OverzichtNiews.vue";

export default function (id) {
  switch (id) {
    case 35:
      return VideoBlock;
    case 50:
      return OverzichtNiews;
    case 51:
      return OverzichtCases;
    case 52:
      return OverzichtWerk;
    case 54:
    case 55:
    case 58:
      return TekstBlock;
    case 57:
      return OverzichtMedewerkers;
    case 60:
      return HeaderBlock;
    default:
      return FallbackBlock;
  }
}

/* 
blocks to do:
  61: Referentie Slider
  66: Our Culture
*/
