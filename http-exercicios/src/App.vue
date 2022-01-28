<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="mensagem in mensagens"
		 :key="mensagem.texto"
		  :variant="mensagem.tipo">{{mensagem.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" size="lg"
				v-model="usuario.nome" placeholver="Informe o Nome">
				</b-form-input>
			</b-form-group>
			<b-form-group label="E-mail:">
				<b-form-input type="email" size="lg"
				v-model="usuario.email" placeholver="Informe o E-mail">
				</b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>
			<b-button @click="obterUsuarios" size="lg" variant="success" class="ml-2">
				Obter Usuários
			</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome: </strong>{{usuario.nome}}<br>
				<strong>E-mail: </strong>{{usuario.email}}<br>
				<strong>ID: </strong>{{id}} <br>
				<b-button variant="warning" size="lg" @click="carregar(id)">Carregar</b-button>
				<b-button varian="danger" size="lg" @click="excluir(id)" class="ml-2">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
export default {
	data(){
		return{
			mensagens:[],
			usuarios:[],
			id:null,//USUARIO SELECIONADO
			usuario:{
				nome:'',
				email:''
			}
		}
	},
	methods:{
		//UM METODO PODE SER USA DO EM OUTRO
		limpar(){
			this.usuario.nome=""
			this.usuario.email=""
			this.id=null
			this.mensagens = []
		},
		//PARA CARREGAR PRECISAMOS DO ID
		carregar(id){
			this.id = id
			//CRIANDO UM CLONE PARA NÃO ALTERA A INSTANCIA QUE TA SENDO REFERENCIADA PELA LISTA DE ELEMENTOS
			this.usuario = {...this.usuarios[id]}
		},excluir(id){
			this.$http.delete(`/usuarios/${id}.json`)
			.then(()=>this.limpar())
			.catch(err =>{
				this.limpar()
				this.mensagens.push({
					texto:'Problema para excluir!',
					tipo:'danger'
				})
			})
		},
		salvar(){
			const metodo = this.id?'patch':'post'
			const finalUrl = this.id?`/${this.id}.json`:'.json'
			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)
			.then(resp =>{
				this.limpar()
				this.mensagens.push({
					texto: 'Operação realizada com sucesso!',
					tipo: 'success'
				})
			})
		},
		obterUsuarios(){
			//pode usar para get apenas $htpp(''usuarios.json)
			//armazenando os dados buscados por get em usuarios
			this.$http.get('usuarios.json').then(res =>{
				this.usuarios = res.data
			})
		}
	}
	/*created(){
		this.$http.post('usuario.json',{
			nome: 'Maria',
			email: 'maria_maria@gmail.com'
		}).then(res => console.log(res))
	}*/
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
