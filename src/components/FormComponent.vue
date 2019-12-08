<template>
	<div :style="{display:active=='form'?'block':'none'}">
		<h2>Form</h2>
		<div>
			<label for="nama">Nama Peserta</label><br>
			<input type="text" name="nama" id="nama" v-model="nama"><br>
			<p></p>
			<label for="asal_sekolah">Asal Sekolah</label><br>
			<input type="text" name="asal_sekolah" id="asal_sekolah" v-model="asal_sekolah"><br>
			<p></p>
			<button @click="simpanData">Simpan</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			active:''
		},
		data() {
			return {
				nama:'',
				asal_sekolah:'',
			}
		},
		methods:{
			async simpanData(){
				var vm = this
				this.$getGapiClient()
		        .then(async gapi => {
		        	var values = [
					  [
					    vm.nama, vm.asal_sekolah
					  ],
					  // Additional rows ...
					];
					var body = {
					  values: values
					};
					gapi.client.sheets.spreadsheets.values.append({
					   spreadsheetId: '1Kd6-Y3DQWpTGRiS8z6CkGOqiCNleYRjPZM5PL0e-iGE',
			           range: 'Sheet1!A:E',
					   valueInputOption: 'USER_ENTERED',
					   resource: body
					}).then((response) => {
					  var result = response.result;
					  console.log(`${result.updates.updatedRows} rows updated.`);
					});
		        })
			}
		}
	}
</script>