<template>
	<div>
		<link rel="stylesheet" type="text/css" href="css/home.css">
		<div class="top-header">
			<div class="">
				<div class="top-flex">
					<div class="top-brand">
						<a href="#">
							<img src="assets/logo.png" width="35px">
							<span>Penerimaan Peserta Didik Baru</span>
						</a>
					</div>
					<div class="top-account">
						<a href="#">
							<span>Administrator</span>
							<img src="assets/logo.png" width="35px">
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="left-sidebar">
				<Nav></Nav>
			</div>
			<div class="web-content">
				<router-view name="auth" />
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Nav from './layouts/Nav.vue'
export default {
	components: {
		'Nav':Nav
	},
}
</script>