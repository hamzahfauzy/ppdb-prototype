<template>
	<div style="padding-top: 50px;">
		<div class="nav-account">
			<img src="assets/logo.png" width="100px" style="margin-right: 10px;" class="nav-account-img">
			<div class="nav-account-info">
				<span class="username-info">Administrator<br></span>
				<span class="email-info">admin@admin.com <br></span>
				<span class="ip-info">IP: 127.0.0.1</span>
			</div>
		</div>
		<ul class="nav-menu-item">
			<li>
				<router-link to="/"><i class="fa fa-home fa-fw"></i> Home</router-link>
			</li>
			<li>
				<router-link to="/form"><i class="fa fa-list fa-fw"></i> Form</router-link>
			</li>
			<li>
				<router-link to="/about"><i class="fa fa-info fa-fw"></i> About</router-link>
			</li>
			<li>
				<a href="javascript:void(0)" @click="logout()"><i class="fa fa-sign-out fa-fw"></i> Log Out</a>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
export default {
	methods: {
		logout(){
			var vm = this
			this.$swal.fire({
			  title: 'Konfirmasi Log Out?',
			  text: "Apakah anda yakin akan keluar dari aplikasi ?",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya'
			}).then((result) => {
			  if (result.value) {
			    vm.$gapi.signOut().then(() => {
					setTimeout(()=>{
						vm.$router.push('/login')
					},1500)
				})
			  }
			})
			
		}
	}
}
</script>