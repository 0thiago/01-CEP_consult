const Main = {

  CEP: '',
  URL: '',

  init: function(){

    this.cacheSelectors()
    this.bindEvents()

  },

  convertFromJSON: function(response){
    return response.json()
  },

  fillFields: function(response){
    const self = Main
     
    if (response.erro == 'true'){
      self.$cepInvalido.innerHTML = `CEP Inválido`

      self.$inputRua.value = ''
      self.$inputBairro.value = ''
      self.$inputCidade.value = ''
      self.$inputEstado.value = ''
      self.$inputIBGE.value = ''

      self.cacheSelectors()
      self.bindEvents()

      console.log('ERRO!')

    } else {
      self.$cepInvalido.innerHTML = ``
      self.$inputRua.value = response.logradouro
      self.$inputBairro.value = response.bairro
      self.$inputCidade.value = response.localidade
      self.$inputEstado.value = response.uf
      self.$inputIBGE.value = response.ibge

      self.cacheSelectors()
      self.bindEvents()

      console.log(response)
    }
   
  },

  showError: function(){
    const self = Main

    self.$inputRua.value = ''
    self.$inputBairro.value = ''
    self.$inputCidade.value = ''
    self.$inputEstado.value = ''
    self.$inputIBGE.value = ''

    self.$cepInvalido.innerHTML = `CEP Inválido`

    self.cacheSelectors()
    self.bindEvents()

    console.log('ERRO!')
  },

  getCEP: function(){
    
    fetch(this.URL, { method: 'GET'})
      .then(this.convertFromJSON)
      .then(this.fillFields)
      .catch(this.showError)

  },

  cacheSelectors: function() {
    
    this.$inputCEP = document.querySelector('#inputCEP')
    this.$inputRua = document.querySelector('#inputRua')
    this.$inputBairro = document.querySelector('#inputBairro')
    this.$inputCidade = document.querySelector('#inputCidade')
    this.$inputEstado = document.querySelector('#inputEstado')
    this.$inputIBGE = document.querySelector('#inputIBGE')
    this.$cepInvalido = document.querySelector('#cepInvalido')

  },

  bindEvents: function(){

    const self = this

    this.$inputCEP.onkeydown = self.Events.inputCEP_onkeydown.bind(this)  
  },

  Events: {

    inputCEP_onkeydown: function(inputCEP_keydown){
      
      const key = inputCEP_keydown.key     
      
      if (key === 'Enter' || key === 'Tab'){
        this.CEP = this.$inputCEP.value
        this.URL = `https://viacep.com.br/ws/${this.CEP}/json/`

        this.getCEP()
      }
      
    }
  }
}


Main.init()