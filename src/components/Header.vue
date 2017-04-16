<template>
  <div>
    <h1 v-if="!name">
      <router-link to="/" exact>retroman</router-link>
    </h1>
    <div v-if="name">
      <h3><router-link to="/" exact>retroman</router-link></h3>
      <h1>{{name}}</h1>
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: ['name', 'description'],
};
</script>

<style scoped>
.router-link-active {
  color: black;
  text-decoration: none;
  cursor: text;
}
</style>
