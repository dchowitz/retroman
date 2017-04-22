<template>
  <div class="note"
    @mouseenter="showDelete = true"
    @mouseleave="showDelete = false">
    <div>
      <a @click="onSelect"><strong>{{title}}</strong> ({{category}})</a>
    </div>
    <div v-for="(line, index) in descriptionLines">
      {{line}}
      <confirm-delete @deleted="onDelete" v-if="showDelete && index === descriptionLines.length - 1" class="delete" />
    </div>
  </div>
</template>

<script>
import ConfirmDelete from '@/components/ConfirmDelete';
import bus from '@/bus';

export default {
  name: 'noteListItem',
  components: {
    'confirm-delete': ConfirmDelete,
  },
  props: ['note'],
  data() {
    return {
      title: this.note.title,
      category: this.note.category,
      description: this.note.description,
      showDelete: false,
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
    onSelect() {
      this.$emit('selected');
      bus.$emit('note-selected', this.note);
    },
    onDelete() {
      this.$emit('deleted');
      bus.$emit('note-deleted', this.note);
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
