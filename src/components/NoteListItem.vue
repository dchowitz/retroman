<template>
  <div class="note"
    @mouseenter="showDelete = true"
    @mouseleave="showDelete = false">
    <div>
      <a @click="onSelect"><strong>{{title}}</strong> ({{category}})</a>
      <confirm-delete class="delete" @deleted="onDelete" v-if="showDelete" />
    </div>
    <div class="line">
      {{firstLine}}
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
    firstLine() {
      const lines = this.description.split('\n');
      return lines.length > 0 ? lines[0] : null;
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
  margin-top: 10px;
  text-align: left;
}

.line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete {
  margin-left: 10px;
}

</style>
