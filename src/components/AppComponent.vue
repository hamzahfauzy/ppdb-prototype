<template>
	<div>
		<a href="#show-index" @click="showElement('index')">Home</a>
		<a href="#show-form" @click="showElement('form')">Form</a>
		<a href="#show-about" @click="showElement('about')">About</a>
		<index-component :active='activeForm' :listData='listData' @deleteRow='deleteRow'/>
		<form-component :active='activeForm' />
		<about-component :active='activeForm' />
	</div>
</template>

<script type="text/javascript">
	import IndexComponent from './IndexComponent.vue'
	import FormComponent from './FormComponent.vue'
	import AboutComponent from './AboutComponent.vue'
	export default {
		async created() {
			this.gapiLogin()
			await this.fetchData()
			// await this.getSpreadsheetId()
		},
		data(){
			return {
				activeForm:'index',
				listData:{},
				spreadsheetId:'',
			}
		},
		components: {
			'index-component':IndexComponent,
			'form-component':FormComponent,
			'about-component':AboutComponent
		},
		methods: {
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
			gapiLogin(){
				if (this.$isAuthenticated() !== true) {
			        this.$login()
			    }
			},
			async fetchData() {
				var vm = this
				this.$getGapiClient()
		        .then(async gapi => {
		        	let response = await gapi.client.sheets.spreadsheets.values.get({
			          spreadsheetId: '1Kd6-Y3DQWpTGRiS8z6CkGOqiCNleYRjPZM5PL0e-iGE',
			          range: 'Sheet1!A2:E',
			        })

			        let data = await response.result;
        			vm.listData = data.values
		        })
		    },
		    deleteRow(data){
		    	var vm = this
				this.$getGapiClient()
		        .then(async gapi => {
		        	var values = [
					  [
					    data.row[0], data.row[1],0
					  ],
					  // Additional rows ...
					];
					var body = {
					  values: values
					};
					gapi.client.sheets.spreadsheets.values.update({
					   spreadsheetId: '1Kd6-Y3DQWpTGRiS8z6CkGOqiCNleYRjPZM5PL0e-iGE',
			           range: 'Sheet1!A'+(data.index+1)+':E'+(data.index+1),
					   valueInputOption: 'USER_ENTERED',
					   resource: body
					}).then((response) => {
					  var result = response.result;
					  console.log(`${result.updatedRows} rows updated.`);
					  vm.fetchData()
					});
		        })
		    }
		}
	}
</script>