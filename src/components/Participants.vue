<template>
  <div>
    <h2>participants</h2>
    <input v-model="newParticipant" placeholder="your name"/>
    <button @click="addParticipant" :disabled="!canAddParticipant">add</button>
    <ul>
      <li v-for="participant in list">
        {{participant.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'participants',
  props: ['list'],
  data() {
    return {
      newParticipant: '',
    };
  },
  computed: {
    canAddParticipant() {
      return !!this.newParticipant;
    },
  },
  methods: {
    addParticipant() {
      this.$emit('add', this.newParticipant);
      this.newParticipant = '';
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
</style>
