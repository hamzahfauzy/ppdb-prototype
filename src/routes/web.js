import IndexComponent from '../components/IndexComponent.vue'
import HomeComponent from '../components/HomeComponent.vue'
import FormComponent  from '../components/FormComponent.vue'
import AboutComponent from '../components/AboutComponent.vue'
import Login from '../components/Login.vue'

export default {
	routes: [
		{
			path: '/login', 
			component: Login,
			meta: {
				title: 'PPDB Login'
			},
		},
		{
			path: '/', 	 
			components: {
				default:IndexComponent,
			},
			meta: {
				title: 'PPDB Homepage'
			},
			children: [
				{
					path: '/',
					components: {
						default:IndexComponent,
						auth:HomeComponent
					},
					meta: {
						title: 'PPDB Homepage'
					},
				},
				{
					path: '/form',
					components: {
						default:IndexComponent,
						auth:FormComponent
					},
					meta: {
						title: 'PPDB Form'
					},
				},
				{
					path: '/about',
					components: {
						default:IndexComponent,
						auth:AboutComponent
					},
					meta: {
						title: 'PPDB About'
					},
				}

			]
		},
	]
}