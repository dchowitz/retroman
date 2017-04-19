<template>
  <div class="note">
    <div>
      <a @click="select"><strong>{{title}}</strong> ({{category}})</a>
    </div>
    <div v-for="line in descriptionLines">{{line}}</div>
  </div>
</template>

<script>
import bus from '@/bus';

export default {
  name: 'noteListItem',
  props: ['note'],
  data() {
    return {
      title: this.note.title,
      category: this.note.category,
      description: this.note.description,
    };
  },
  computed: {
    descriptionLines() {
      const lines = this.description.split('\n');
      const copy = lines.slice(0, 2);
      if (lines.length > 2) {
        copy[1] = `${copy[1]} ...`;
      }
      return copy;
    },
  },
  methods: {
    select() {
      this.$emit('select');
      bus.$emit('note-selected', this.note);
    },
  },
};
</script>

<style scoped>

.note {
  max-width: 300px;
  margin: 10px;
  text-align: left;
}

</style>
