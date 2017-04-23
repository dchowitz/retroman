<template>
  <div>
    <retro-header
      :name="name"
      :description="description" />

    <participant-list class="margin-top"
      :names="participants"
      :selected="selectedParticipantName"
      @selected="onParticipantSelected"
      @unselected="onParticipantUnselected" />

    <note-editor class="margin-top"
      v-if="showNoteEditor"
      :note="noteToEdit"
      @save="onNoteSave"
      @cancel="showNoteEditor = false" />

    <div v-else>
      <add-note class="margin-top"
        v-if="selectedParticipantName"
        @categorySelected="onNoteCategorySelected" />
      <note-list class="margin-top"
        :notes="notesByParticipant" />
    </div>

    <div class="debug">
      {{JSON.stringify(notesByParticipant)}}
    </div>
  </div>
</template>

<script>
import { getRetro, postParticipant } from '@/api';
import Header from '@/components/Header';
import ParticipantList from '@/components/ParticipantList';
import AddParticipant from '@/components/AddParticipant';
import NoteList from '@/components/NoteList';
import AddNote from '@/components/AddNote';
import NoteEditor from '@/components/NoteEditor';
import bus from '@/bus';

export default {
  name: 'retro',
  props: ['id'],
  components: {
    'retro-header': Header,
    'participant-list': ParticipantList,
    'add-participant': AddParticipant,
    'note-list': NoteList,
    'add-note': AddNote,
    'note-editor': NoteEditor,
  },
  created() {
    this.initData();
    bus.$on('participant-added', this.onParticipantAdded);
    bus.$on('note-selected', this.onNoteSelected);
    bus.$on('note-deleted', this.onNoteDeleted);
  },
  watch: {
    $route() {
      this.initData();
    },
  },
  data() {
    return {
      name: '',
      description: '',
      participants: [],
      notes: [],
      selectedParticipantName: null,
      noteToEdit: null,
      showNoteEditor: false,
    };
  },
  computed: {
    notesByParticipant() {
      return this.selectedParticipantName
        ? this.notes.filter(n => n.author === this.selectedParticipantName)
        : this.notes;
    },
  },
  methods: {
    initData() {
      getRetro(this.id)
        .then(this.update)
        .then(() => {
          this.selectedParticipantName = null;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },

    onParticipantSelected(name) {
      this.selectedParticipantName = name;
      this.showNoteEditor = false;
    },

    onParticipantUnselected() {
      this.selectedParticipantName = null;
      this.showNoteEditor = false;
    },

    onParticipantAdded(name) {
      // TODO: prevent adding participants when request is ongoing
      this.createOrUpdateParticipant(name)
        .then(() => {
          this.selectedParticipantName = name;
          this.showNoteEditor = false;
        });
    },

    onNoteCategorySelected(category) {
      this.noteToEdit = { title: null, category, description: null };
      this.showNoteEditor = true;
    },

    onNoteSelected(note) {
      this.noteToEdit = note;
      this.showNoteEditor = true;
    },

    // TODO: dedicated api endpoint for note update/creation?
    // TODO: better overall state handling - this fiddling here is gruesome - vuex?!
    onNoteSave(editedNote) {
      const note = this.notes.find(n => n.id === editedNote.id);
      if (note) {
        Object.assign(note, editedNote);
      } else {
        const newNote = Object.assign({}, editedNote, { author: this.selectedParticipantName });
        this.notes.push(newNote);
      }

      // TODO: prevent last update from overwriting changes in another client?
      this.createOrUpdateParticipant((note && note.author) || this.selectedParticipantName)
        .then(() => {
          this.showNoteEditor = false;
        });
    },

    onNoteDeleted(deletedNote) {
      const position = this.notes.findIndex(n => n.id === deletedNote.id);
      if (position === -1) {
        return;
      }
      this.notes.splice(position, 1);
      this.createOrUpdateParticipant(deletedNote.author);
    },

    createOrUpdateParticipant(participantName) {
      const participant = {
        name: participantName,
        notes: this.notes
          .filter(n => n.author === participantName)
          .map((n) => {
            const { author, ...note } = n;
            return note;
          }),
      };

      return postParticipant(this.id, participant)
        .then(this.update)
        // eslint-disable-next-line
        .catch(console.log);
    },

    update(retro) {
      this.name = retro.name;
      this.description = retro.description;
      this.participants = retro.participants;
      this.notes = retro.notes;
    },
  },
};
</script>

<style scoped>

.margin-top {
  margin-top: 20px;
}

</style>
