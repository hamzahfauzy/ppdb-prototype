<template>
	<div :style="{display:active=='index'?'block':'none'}">
		<h2>Selamat Datang</h2>
		<label>Data Peserta</label>
		<ul>
			<li v-for="(data,index) in listData" v-if="data[2] != 0">{{data[0]}} ({{data[1]}}) - <a :href="'#delete-'+index" @click="deleteRow(data, index)">Delete</a></li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			active:'',
			listData:{}
		},
		created(){

		},
		data(){
			return {
				
			}
		},
		methods: {
			deleteRow(row,index){
				var data = {row:row,index:index+1}
				this.$emit('deleteRow',data)
			}
		}
	}
</script>