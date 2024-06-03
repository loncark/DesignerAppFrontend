<template>
  <div class="not-found">
    <h1>Oops!</h1>
    <p>The page you requested was not found.</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f5f5;
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
  color: #333;
  font-weight: bold;
}
</style>
