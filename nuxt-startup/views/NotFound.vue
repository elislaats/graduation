<template>
  <main class="flex flex-column align-center justify-center">
    <h1 class="text-align-center">404</h1>
    <p style="font-size: x-large">
      Helaas, er werd niets gevonden op
      <strong class="text-primary">/{{ $route.params.badUrl }}</strong>
    </p>
  </main>
</template>