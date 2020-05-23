<template>
	<div>
	<link rel="stylesheet" type="text/css" href="css/login.css">
	  <div class="container">
	    <div class="row">
	      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
	      	<div style="margin-bottom: -120px;z-index: 1;position: relative;padding-top: 100px;">
	      	<center>
	          	<img src="assets/logo.png" width="150px">
	        </center>
	        </div>
	        <div class="card card-signin my-5">
	          <div class="card-body">
	          	<br><br>
	            <h5 class="card-title text-center">Login Sistem PPDB</h5>
	            <button @click="login" class="btn btn-lg btn-danger btn-block" type="submit"><i class="fa fa-google"></i> Sign in With Google</button>
	          </div>
	        </div>
	        <center>
	        	<span style="color: #FFF;">Copyright &copy; 2020 . Z-Techno</span>
	        </center>
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script type="text/javascript">
export default {
	async created() {
		await this.gapiLogin()

		// await this.getSpreadsheetId()
	},
	methods: {
		async gapiLogin(){
			var vm = this
			vm.$gapi.isSignedIn()
			.then(result => {
				if(result)
					vm.$router.push('/')
			})
		},
		async login(){
			var vm = this
			vm.$gapi.signIn()
			.then(user => {
			    vm.gapiLogin()
			})
		}
	}

}
</script>