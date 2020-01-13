<template>
  <aside class="main-sidebar">
	  <ul class="file-list">
		  <li v-for="item in items" :key="item.files">
			  <a href="#" v-for="file in item.files" :key="file">{{file.filename}}</a>
		  </li>
	  </ul>
	    <router-link to="/create" class="main-sidebar__add">Add new</router-link>
	</aside>
</template>

<script>
import axios from 'axios';
export default {
  name: 'side',
  data(){
	  return {
		  items:[],
		  errors: []
	  }
  },
  methods: {
	async getItems(){
		try {
			const header = {
				"Authorization": `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      	}
			const response = await axios({
				url: 'https://api.github.com/users/plecsi/gists',
				method: 'get',
				headers: header
			});
			this.items=response.data;
		} catch (e) {
			console.log('Failure!', e);
 			this.errors.push(e)
		}
	}
},
mounted() {
	this.getItems();
},
}
</script>