<template>
  <div class="about">
    <h1>About</h1>
    <p>Applicatie door Eli Slaats</p>
    <p>Gebruik van Api door <a href="https://www.artic.edu/open-access/public-api">Art Institute Chicago</a></p>
    <router-link class=button to="/art">See Artwork</router-link>

  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style lang="scss" scoped>
.about {
  align-self: stretch;
  justify-self: stretch;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  a{
    color: inherit;
  }
  .button {
    align-self: center;
    background-color: var(--tan);
    color: var(--burgundy);
    text-decoration: none;
    font-weight: 600;
    width: 50%;
    padding: .5rem 0;
    border-radius: 20px;
    text-align: center;
    transition: .5s ease-out;
    &:hover{
      transform: scale(0.9);
    }
  }

}
</style>
