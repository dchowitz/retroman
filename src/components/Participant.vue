<template>
  <div>
    <h2><a @click="back">participants</a> / {{who.name}}</h2>
    <div class="notes-container">
      <note :param="n" v-for="n in who.notes" @save="saveNote"/>
    </div>
  </div>
</template>

<script>
import Note from '@/components/Note';

export default {
  name: 'participant',
  props: ['who'],
  components: {
    note: Note,
  },
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$emit('back');
    },
    saveNote(note) {
      // eslint-disable-next-line
      console.log(note);
    },
  },
};
</script>

<style scoped>
p {
  margin: 10px;
}

h2 {
  margin: 10px;
}

button {
  font-size: 11px;
}

.notes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
