<template>
  <div class="container">
    <div>
      <strong v-if="!selected">All</strong>
      <a v-else @click="$emit('unselected')"><strong>All</strong></a>
      participants
    </div>
    <div v-for="name in names">
      <a v-if="selected !== name" @click="$emit('selected', name)"><strong>{{name}}</strong></a>
      <strong v-else>{{name}}</strong>
    </div>
    <add-participant />
  </div>
</template>

<script>
import AddParticipant from '@/components/AddParticipant';

export default {
  name: 'participant-list',
  props: ['names', 'selected'],
  components: {
    'add-participant': AddParticipant,
  },
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
}

.container > * {
  margin: 0 10px 0 10px;
}

</style>
