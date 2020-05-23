<template>
	<div class="container-fluid">
		<h2>Form</h2>
		<div class="row">
			<div class="col-sm-12 col-md-6">
				<div v-if="msg" class="alert alert-success" role="alert">
				  {{msg}}
				</div>
				<div class="form-group">
					<label for="asal_sekolah">NISN</label>
					<input type="text" class="form-control" name="asal_sekolah" id="asal_sekolah" v-model="asal_sekolah">
				</div>
				<div class="form-group">
					<label for="nama">Nama Peserta</label>
					<input type="text" class="form-control" name="nama" id="nama" v-model="nama">
				</div>
				<div class="form-group">
					<label for="nama">Nilai 1</label>
					<input type="text" class="form-control" name="nilai_1" id="nilai_1" v-model="nilai_1">
				</div>
				<div class="form-group">
					<label for="nama">Nilai 2</label>
					<input type="text" class="form-control" name="nilai_2" id="nilai_2" v-model="nilai_2">
				</div>
				<div class="form-group">
					<label for="nama">Nilai 3</label>
					<input type="text" class="form-control" name="nilai_3" id="nilai_3" v-model="nilai_3">
				</div>
				<div class="form-group">
					<label for="nama">Nilai 4</label>
					<input type="text" class="form-control" name="nilai_4" id="nilai_4" v-model="nilai_4">
				</div>
			
				<button class="btn btn-primary btn-simpan" @click="simpanData"><i class="fa fa-save"></i> Simpan</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		async created() {
			await this.gapiLogin()
			// await this.getSpreadsheetId()
		},
		data() {
			return {
				msg:'',
				nama:'',
				asal_sekolah:'',
				nilai_1:'',
				nilai_2:'',
				nilai_3:'',
				nilai_4:'',
			}
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
			async simpanData(){
				document.querySelector('button.btn-simpan').disabled = true
				var vm = this
				this.$swal.fire({
				  title: 'Konfirmasi Simpan?',
				  text: "Apakah anda yakin untuk menyimpan data ini ?",
				  icon: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Ya'
				}).then((result) => {
				  if (result.value) {
				    vm.$gapi._libraryInit('client')
			        .then(async client => {
			        	var values = [
						  [
						    vm.asal_sekolah, vm.nama, vm.nilai_1, vm.nilai_2, vm.nilai_3, vm.nilai_4
						  ],
						  // Additional rows ...
						];
						var body = {
						  values: values
						};
						client.sheets.spreadsheets.values.append({
						   spreadsheetId: '1Kd6-Y3DQWpTGRiS8z6CkGOqiCNleYRjPZM5PL0e-iGE',
				           range: 'Sheet1!A:G',
						   valueInputOption: 'USER_ENTERED',
						   resource: body
						}).then((response) => {
						  var result = response.result;
						  vm.asal_sekolah = ""
						  vm.nama = ""
						  vm.nilai_1 = ""
						  vm.nilai_2 = ""
						  vm.nilai_3 = ""
						  vm.nilai_4 = ""
						  vm.msg = "Data Berhasil disimpan"
						  console.log(`${result.updates.updatedRows} rows inserted.`);
						  document.querySelector('button.btn-simpan').disabled = false
						  setTimeout(() => {
						  	vm.msg = ""
						  },3000)
						});
			        })
				  }else{
				  	document.querySelector('button.btn-simpan').disabled = false
				  }
				})
				
			}
		}
	}
</script>