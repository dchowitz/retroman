<template>
  <div class="hello">
    <retro-header />
    <h2>retrospectives made easy</h2>
    <button @click="$router.push('new')">start new</button>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'hello',
  components: {
    'retro-header': Header,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
