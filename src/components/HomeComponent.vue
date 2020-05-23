<template>
	<div class="container-fluid">
		<h2>Selamat Datang</h2>
		<label>Data Peserta</label>
		<div class="table-responsive">
			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>NISN</th>
						<th>Nama Siswa</th>
						<th>Nilai 1</th>
						<th>Nilai 2</th>
						<th>Nilai 3</th>
						<th>Nilai 4</th>
						<th>Total Nilai</th>
						<th>Rata-Rata</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="showedData.length == 0">
						<td colspan="9">
							<center><i>Tidak ada data</i></center>
						</td>
					</tr>
					<tr v-if="listData.length == undefined">
						<td colspan="9">
							<center><i>Memuat Data</i></center>
						</td>
					</tr>
					<tr v-for="(data,index) in listData" v-if="data[6] != 0">
						<td>{{counted(index)}}</td>
						<td>
							{{data[0]}}<br>
							<a href="javascript:void(0)" class="btn btn-warning btn-sm"><i class="fa fa-pencil"></i></a>
							<a href="javascript:void(0)" @click="deleteRow(data, index+1)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></a>
						</td>
						<td>
							{{data[1]}}
						</td>
						<td>
							{{data[2]}}
						</td>
						<td>
							{{data[3]}}
						</td>
						<td>
							{{data[4]}}
						</td>
						<td>
							{{data[5]}}
						</td>
						<td>
							{{total(data)}}
						</td>
						<td>
							{{avrg(data)}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		async created() {
			this.gapiLogin()
			// await this.getSpreadsheetId()
		},
		data(){
			return {
				activeForm:'index',
				listData:{},
				showedData:{},
				spreadsheetId:'',
				rowCount:0
			}
		},
		methods: {
			counted(index){
				var allData = this.listData.length
				var hiddenData = this.listData.filter(data => {
					return data[6] != 0
				})
				var selisih = allData - hiddenData.length
				return (index-selisih)+1
			},
			total(data){
				return parseInt(data[2])+parseInt(data[3])+parseInt(data[4])+parseInt(data[5]);
			},
			avrg(data)
			{
				var total = this.total(data)
				return total/4
			},
			async showElement(el){
				this.activeForm = el
				if(el == 'index')
					await this.fetchData()
			},
			async getSpreadsheetId(){
				var email = window.localStorage.getItem('user_email');
				let response = await fetch('http://localhost:8000/api/get-spreadsheet-id/'+email)
				let data = response.json()
				this.spreadsheetId = data.spreadsheetId
			},
			async gapiLogin(){
				var vm = this
				vm.$gapi.isSignedIn()
				.then(result => {
					if(!result)
						vm.$router.push('/login')
					else
						vm.fetchData()
				})
				.catch(err => {
					vm.$router.push('/login')
				})
			},
			async fetchData() {
				console.log(this.listData)
				var vm = this
				this.$gapi._libraryInit('client')
		        .then(async client => {
		        	let response = await client.sheets.spreadsheets.values.get({
			          spreadsheetId: '1Kd6-Y3DQWpTGRiS8z6CkGOqiCNleYRjPZM5PL0e-iGE',
			          range: 'Sheet1!A2:G',
			        })

			        let data = await response.result;
        			vm.listData = data.values
        			vm.showedData = vm.listData.filter(data => {
        				return data[6] != 0
        			})
        			console.log(vm.listData)
		        })
		    },
		    deleteRow(data, index){
		    	var vm = this
				this.$swal.fire({
				  title: 'Konfirmasi Hapus?',
				  text: "Apakah anda yakin akan menghapus data ini ?",
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
						    data[0], data[1], data[2], data[3], data[4], data[5], 0
						  ],
						  // Additional rows ...
						];
						var body = {
						  values: values
						};
						client.sheets.spreadsheets.values.update({
						   spreadsheetId: '1Kd6-Y3DQWpTGRiS8z6CkGOqiCNleYRjPZM5PL0e-iGE',
				           range: 'Sheet1!A'+(index+1)+':G'+(index+1),
						   valueInputOption: 'USER_ENTERED',
						   resource: body
						}).then((response) => {
						  var result = response.result;
						  if(result.updatedRows)
						  	vm.$swal("Data Berhasil di Hapus")
						  console.log(`${result.updatedRows} rows updated.`);
						  vm.fetchData()
						});
			        })
				  }
				})
		    },
		}
	}
</script>