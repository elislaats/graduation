<template>
  <footer class="footer">
    <video
      class="footer-bg"
      loop
      webkit-playsinline
      playsinline
      muted
      autoplay
      preload="auto"
    >
      <source
        src="https://player.vimeo.com/progressive_redirect/playback/724788630/rendition/1080p/file.mp4?loc=external&amp;signature=0962fd8ec5d92d26a872b95d62f0bd8ebee54f4c18515c2271a4aeddd513c9a6"
        type="video/mp4"
      />
    </video>
    <div class="grid grid-pad">
      <div class="footer-cta">
        <div class="ctas flex">
          <div class="col-1-2 xs-col-1-1 flex">
            <div
              class="cta contact flex flex-nowrap flex-column align-center justify-space-between"
            >
            <ClientOnly>
              <ImageComp
                :id="5755"
                :width="900"
                :height="900"
                className="cta-bg cta-contact bg-image"
              >
              </ImageComp>
              <template #fallback>
                <LoadingIncicator></LoadingIncicator>
              </template>
            </ClientOnly>
              <div class="cta-icon contact"></div>
              <h3 class="cta-title">
                Samen met ons aan een mooi experiment werken?
              </h3>
              <NuxtLink class="btn btn-primary outline" to="/contact">
                Neem contact op
              </NuxtLink>
            </div>
          </div>

          <div class="col-1-2 xs-col-1-1 flex">
            <div
              class="cta vacature flex flex-nowrap flex-column align-center justify-space-between"
            >
            <ClientOnly>
              <ImageComp
                :id="5754"
                :width="900"
                :height="900"
                className="cta-bg cta-vacature bg-image"
              >
              </ImageComp>
              <template #fallback>
                <LoadingIncicator></LoadingIncicator>
              </template>
            </ClientOnly>
              <div class="cta-icon vacature"></div>
              <h3 class="cta-title">Bij ons in het Lab werken?</h3>
              <NuxtLink class="btn btn-primary outline" to="/vacatures">
                Bekijk onze vacatures
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="col-1-1">
        <h2 class="footer-headline">Durf jij met ons het lab in?</h2>
      </div>

      <div class="col-1-1 footer-contact flex align-start">
        <img
          src="~/assets/images/beeldmerk_cre8ion_white.svg"
          alt="Beeldmerk The Cre8ion.Lab"
          class="footer-beeldmerk"
          width="65"
          height="65"
          loading="lazy"
        />

        <div class="footer-text">
          <strong>The Cre8ion.lab</strong>
          <p>
            De Gruyter Fabriek
            <br />Gebouw F - Ruimte 4301 <br />Veemarktkade 8 <br />5222 AE,
            's-Hertogenbosch
          </p>
        </div>

        <div class="footer-text">
          <strong>Contact</strong>
          <p>
            073-5432789
            <br /><a href="mailto:info@cre8ion.com">info@cre8ion.com</a>
          </p>
          <ul class="footer-socials">
            <li>
              <a
                href="https://www.facebook.com/thecre8ionlab"
                target="_blank"
                title="Volg ons op Facebook"
                ><i class="icon icon-facebook"></i
              ></a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/the-cre8ion.lab"
                target="_blank"
                title="Volg ons op LinkedIn"
                ><i class="icon icon-linkedin"></i
              ></a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thecre8ionlab/"
                target="_blank"
                title="Volg ons op Instagram"
                ><i class="icon icon-instagram"></i
              ></a>
            </li>
            <li>
              <a
                href="https://twitter.com/thecre8ionlab"
                target="_blank"
                title="Volg ons op Twitter"
                ><i class="icon icon-twitter"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  position: relative;
  display: block;
  .footer-bg {
    display: inline-block;
    width: 100vw;
    aspect-ratio: 16/9;
    position: absolute;
    left: 50%;
    bottom: 0;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: -1;
  }
  .footer-cta {
    .ctas {
      .cta {
        aspect-ratio: 10/7;
        width: 100%;
        text-align: center;
        padding: 8rem 3rem;
        margin-bottom: 2rem;
        transition: all ease 0.3s;
        position: relative;
        .cta-bg {
          filter: grayscale(1) brightness(.5);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          -webkit-transition: all ease 0.3s;
          -o-transition: all ease 0.3s;
          transition: all ease 0.3s;
        }
      }
    }
  }
}
</style>
