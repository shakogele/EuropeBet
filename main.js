var Vue = require('vue/dist/vue.js');
var VueI18n = require('vue-i18n');
var messages = require('./src/js/messages.js');

Vue.use(VueI18n);

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

// Create a Vue instance with `i18n` option
new Vue({
  i18n,
  data: {
    locale: 'en',
    totalCoeficient: 0,
    betValue: 0,
    stake: 0,
    tickets: {
      en: [
        {
          title: 'FC Liverpool - FC Porto',
          result: '1',
          result_category: 'Main Result',
          coeficient: 1.5
        },
        {
          title: 'Totenhem Hotspur - Juventus',
          result: 'X2',
          result_category: 'Double Result',
          coeficient: 1.7
        },
        {
          title: 'FC Roma - FC Shakhtar',
          result: '1',
          result_category: 'Main Result',
          coeficient: 1.65
        }
      ],
      ru: [
        {
          title: 'ФК Ливерпуль - ФК Порту',
          result: '1',
          result_category: 'Основной результат',
          coeficient: 1.5
        },
        {
          title: 'Тоттенхэм Хотспур - Ювентус',
          result: 'X2',
          result_category: 'Двойной результат',
          coeficient: 1.7
        },
        {
          title: 'ФК Рома - ФК Шахтер',
          result: '1',
          result_category: 'Основной результат',
          coeficient: 1.65
        }
      ],
      ka: [
        {
          title: 'FC ლივერპული - FC პორტო',
          result: '1',
          result_category: 'ძირითადი შედეგი',
          coeficient: 1.5
        },
        {
          title: 'ტოტენჯემ ჰოტსპური - იუვენტუსი',
          result: 'X2',
          result_category: 'გაურმაგებული შედეგი',
          coeficient: 1.7
        },
        {
          title: 'FC რომა - FC შახტარი',
          result: '1',
          result_category: 'ძირითადი შედეგი',
          coeficient: 1.65
        }
      ]
    }
  },
  methods: {
    onChangeLanguage: function(e){
      i18n.locale = e.target.value;
    },
    getTotalCoeficient: function(){
        var coeficient = 0;
        this.tickets[this.locale].forEach(function(value, index){
          coeficient += value.coeficient;
        })
        return coeficient;
    },
    isNumber: function(e){
        ev = (e) ? e : window.event;
        var charCode = (ev.which) ? ev.which : ev.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          ev.preventDefault();;
        } else {
          return true;
        }
    }
  }
}).$mount('#app')
