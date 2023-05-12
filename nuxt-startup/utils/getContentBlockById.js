import FallbackBlock from "~/components/contentblocks/FallbackBlock.vue"
import HeaderBlock from "~/components/contentblocks/HeaderBlock.vue"
import TekstBlock from "~/components/contentblocks/TekstBlock.vue";

export default function (id) {
  switch (id) {
    case 54:
      return TekstBlock
    case 58:
      return TekstBlock
    case 60:
      return HeaderBlock;
    default:
      return FallbackBlock;
  }
}
