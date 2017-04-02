import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import New from '@/components/New';
import Retro from '@/components/Retro';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/new',
      name: 'New',
      component: New,
    },
    {
      path: '/retro/:id',
      name: 'Retro',
      component: Retro,
      props: true,
    },
  ],
});
