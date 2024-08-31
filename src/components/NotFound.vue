<template>
  <div class="not-found flex-column">
    <h1>Oops!</h1>
    <p>The page you requested was not found.</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  width: 80vw;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.not-found a {
  text-decoration: none;
  font-weight: bold;
}
</style>
