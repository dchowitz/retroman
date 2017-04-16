<template>
  <button @click="toClipboard">{{name}}</button>
</template>

<script>
export default {
  name: 'copy-to-clipboard',
  props: ['name', 'text'],
  methods: {
    toClipboard() {
      // eslint-disable-next-line
      const node = createNode(this.text);
      document.body.appendChild(node);
      // eslint-disable-next-line
      copyNode(node);
      document.body.removeChild(node);
    },
  },
};

function createNode(text) {
  const node = document.createElement('pre');
  node.style.width = '1px';
  node.style.height = '1px';
  node.style.position = 'fixed';
  node.style.top = '5px';
  node.textContent = text;
  return node;
}

function copyNode(node) {
  const selection = getSelection();
  selection.removeAllRanges();

  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);

  document.execCommand('copy');
  selection.removeAllRanges();
}
</script>

<style scoped>
button {
  font-size: 11px;
}
</style>
