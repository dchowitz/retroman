<template>
  <div>
    <h2>{{name}}</h2>
    <p>
      {{description}}<br/>
      <span id="jsCopyLink">{{link}}</span> <button @click="copyLink">copy link</button>
    </p>
    <hr/>
    <h2>participants</h2>
    <input v-model="newParticipant" placeholder="your name"/>
    <button @click="addParticipant" :disabled="!canAddParticipant">add</button>
    <ul>
      <li v-for="p in participants">
        {{p.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { getRetro, createParticipant } from '@/api';

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
  created() {
    this.initData();
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
      newParticipant: '',
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
        // eslint-disable-next-line
        .catch(console.log);
    },
    copyLink() {
      toClipboard('jsCopyLink');
    },
    addParticipant() {
      createParticipant(this.id, this.newParticipant)
        .then(this.update)
        // eslint-disable-next-line
        .catch(console.log);
    },
    update(retro) {
      this.name = retro.name;
      this.description = retro.description;
      this.participants = retro.participants;
      this.link = window.location.toString();
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
