<template>
  <div id="app">
  <div class="github-notes">
    
	<Head/>
	<Side/>
	
	</div>
	 <router-view/>
  </div>
</template>

<script>
import Head from './components/head';
import Side from './components/side';
export default {
  name: 'app',
  components: {
   Head,
	   Side,
  }
}
</script>

<style lang="scss" scoped>
   @import 'styles/main.scss';
</style>
