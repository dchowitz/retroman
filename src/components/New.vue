<template>
  <div>
    <retro-header />
    <h2>new retro</h2>
    <div>
      <input v-model="name" placeholder="retro name" />
    </div>
    <div>
      <textarea v-model="description" placeholder="optional description here" />
    </div>
    <p>on submit<br/>
      retro is generated<br/>
      persisted<br/>
      id resp. unique link is returned and available to get copied</p>
    <button @click="onCreate" :disabled="!canCreate">create</button>
  </div>
</template>

<script>
import { postRetro } from '@/api';
import Header from '@/components/Header';

export default {
  name: 'new',
  components: {
    'retro-header': Header,
  },
  data() {
    return {
      name: '',
      description: '',
    };
  },
  computed: {
    canCreate() {
      return !!this.name;
    },
  },
  methods: {
    onCreate() {
      const retro = {
        name: this.name,
        description: this.description,
      };

      postRetro(retro)
        .then((result) => {
          this.$router.push(`retro/${result.id}`);
        })
        // eslint-disable-next-line
        .catch(console.log);
    },
  },
};
</script>

<style scoped>

</style>
