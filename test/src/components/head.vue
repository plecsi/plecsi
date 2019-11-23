<template>
  <header class="main-header">
	   <router-link to="/">
   			<h1 class="main-header__title">Github notes</h1>
	  </router-link>
	<figure class="user-info">
	<picture class="user-info__avatar"><img v-bind:src="user.avatar_url" alt=""/></picture>
	<figcaption class="user-info__name">{{user.login}}</figcaption>
	</figure>
  </header>
</template>

<script>
import axios from 'axios';
export default {
  name: 'head',
  data(){
	  return {
		  user:[],
		  errors: []
	  }
  },
  methods: {
	async users(){
		try {
			const response = await axios({
			url:'https://api.github.com/users/plecsi', 
			method: 'get'
			});
			this.user=response.data;
			console.log('data', response.data)
		} catch (e) {
			console.log('Failure!', e);
 			this.errors.push(e)
		}
	}
},
mounted() {
	this.users();
},
}
</script>