<template>
  <div>
    <h1 v-if="!name">
      <router-link to="/" exact>retroman</router-link>
    </h1>
    <div v-if="name">
      <h3><router-link to="/" exact>retroman</router-link></h3>
      <h1>{{name}}
        <copy-to-clipboard name="copy link" :text="link"/>
      </h1>
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
import CopyToClipboard from '@/components/CopyToClipboard';

export default {
  name: 'header',
  props: ['name', 'description'],
  components: {
    'copy-to-clipboard': CopyToClipboard,
  },
  computed: {
    link() {
      return this.name && window.location.toString();
    },
  },
};
</script>

<style scoped>
p {
  margin: 10px;
}

h1, h2 {
  margin: 10px;
}

.router-link-active {
  color: black;
  text-decoration: none;
  cursor: text;
}
</style>
