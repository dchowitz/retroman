<template>
  <div class="note-list">
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

.note-list {
  width: 400px;
  margin: 20px auto 0 auto;
}

</style>
