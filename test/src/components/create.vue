<template>
	<div class="file-edit">
	<form>
		<div class="file-edit">
        <h2 class="file-edit__name">
			<input type="text" name="filename" placeholder="filename.ext"/>
			</h2>
		</div>
		<textarea name="content"></textarea>
		<div class="file-edit__buttons">
          <button class="btn btn--positive">Save</button>
        </div>
	</form>
	</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'create',
  data(){
	  return {
		  items:[],
		  errors: []
	  }
  },
  methods: {
	async postItems(){
		try {
			const header = {
				"Authorization": `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      	}
			const response = await axios({
				url: 'https://api.github.com/gists',
				method: 'post',
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
	this.postItems();
},
}
</script>