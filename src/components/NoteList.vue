<template>
  <div class="container">
    <note-item v-for="note in notes"
      :key="note.id"
      :note="note" />
  </div>
</template>

<script>
import NoteListItem from '@/components/NoteListItem';

export default {
  name: 'note-list',
  props: ['notes'],
  components: {
    'note-item': NoteListItem,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
