<template>
  <div>
    <retro-header :name="name" :description="description" />
    <!--<h2>{{name}} <button @click="copyLink">copy link</button></h2>
    <div id="jsCopyLink">{{link}}</div>
    <p v-if="!!description">
      {{description}}
    </p>
    <hr/>-->
    <participants v-if="!selectedParticipant" :list="participants" @add="addParticipant" @select="selectParticipant" />
    <participant v-if="selectedParticipant" :who="selectedParticipant" @back="selectedParticipant = null" @update="updateParticipant" />
  </div>
</template>

<script>
import { getRetro, createOrUpdateParticipant } from '@/api';
import Header from '@/components/Header';
import Participants from '@/components/Participants';
import Participant from '@/components/Participant';

function toClipboard(containerId) {
  let range;
  const node = document.getElementById(containerId);
  if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
    document.execCommand('copy');
  } else if (window.getSelection) {
    range = document.createRange();
    range.selectNodeContents(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
}

export default {
  name: 'retro',
  props: ['id'],
  components: {
    'retro-header': Header,
    participants: Participants,
    participant: Participant,
  },
  created() {
    this.initData();
    this.$router.afterEach((to) => {
      // eslint-disable-next-line
      console.log(to);
    });
  },
  watch: {
    $route() {
      this.initData();
    },
  },
  data() {
    return {
      link: '',
      name: '',
      description: '',
      participants: [],
      selectedParticipant: null,
    };
  },
  computed: {
    canAddParticipant() {
      return !!this.newParticipant;
    },
  },
  methods: {
    initData() {
      getRetro(this.id)
        .then(this.update)
        .then(() => {
          this.selectedParticipant = null;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },
    copyLink() {
      toClipboard('jsCopyLink');
    },
    addParticipant(participantName) {
      createOrUpdateParticipant(this.id, { name: participantName })
        .then(this.update)
        .then(() => {
          this.selectedParticipant = null;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },
    updateParticipant(participant) {
      createOrUpdateParticipant(this.id, participant)
        .then(this.update)
        // eslint-disable-next-line
        .catch(console.log);
    },
    selectParticipant(participant) {
      this.selectedParticipant = participant;
    },
    update(retro) {
      this.name = retro.name;
      this.description = retro.description;
      this.participants = retro.participants;
      this.link = window.location.toString();
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

#jsCopyLink {
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
