<template>
	<div>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
export default {
	async created() {
		await this.gapiLogin()
		// await this.getSpreadsheetId()
	},
	methods:{
		async gapiLogin(){
			var vm = this
			vm.$gapi.isSignedIn()
			.then(result => {
				if(!result)
					vm.$router.push('/login')
				else
					vm.$router.push('/')
			})
			.catch(err => {
				vm.$router.push('/login')
			})
		},
	}
}
</script>
<style type="text/css">
.swal2-container {
    background-color: rgba(0,0,0,0.5) !important;
}
</style>