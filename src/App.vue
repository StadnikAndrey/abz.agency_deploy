<template>
  <div id="app">
    <header class="header">       
        <div class="content">         
            <nav class="nav">               
              <router-link to="/" @click.native="scrollBehaviorHash('/')">
                <img src="./assets/img/logo.svg" alt="">
              </router-link>               
              <div>
                <div class="wrap_menu">
                  <div class="menu" :class="active_menu">                     
                    <div v-for="(item, index) in menu" :key="index" class="menu_section">
                      <router-link v-for="value in item" :key="value.text"
                        @click.native="scrollBehaviorHash(value.url)"                       
                        :to="value.url"                        
                        class="menu_item"                         
                        :class="target_item_menu===value.url?router_link_activ_class:''"                       
                      >
                        <span v-if="value.text !==''" @click="closeMenu">{{value.text}}</span> 
                        <img v-else src="./assets/img/logo.svg" @click="closeMenu" alt="">
                      </router-link>
                    </div>
                  </div>
                  <div class="menu_icon">
                    <img @click="showMenu" src="./assets/img/menu-icon.svg" alt="">
                  </div>
                </div>
              </div>
            </nav>  
            <div class="scrim" :class="active_scrim" @click="closeMenu"></div>      
        </div>       
    </header>  

    <main class="main"><router-view/></main>

    <footer class="footer">
      <div class="content">
        <p>&copy; abz.agency specially for the test task</p>
      </div>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      menu: [],
      active_menu: '',
      active_scrim: '',      
    }
  },
  created(){
    this.menuCreated();
    window.addEventListener('resize', this.menuCreated);           
  },
  destroyed(){		 
		window.removeEventListener('resize', this.menuCreated);		 
	},
  computed: {
    ...mapGetters('global', {
			router_link_activ_class: 'router_link_activ_class'
		}),
    ...mapGetters('global', {
			target_item_menu: 'target_item_menu'
		})
  },   
  methods: {     
    scrollBehaviorHash(url) { 
      //изменение активного пункта меню для подсветки
      this.$store.dispatch('global/target_item_menu', url);   
      //если это переход по якорной ссылке                 
      if (this.$route.hash != '' && window.location.hash === this.$route.hash) {                   
        let el = document.getElementById(this.$route.hash.slice(1));
        if (el) {           
          window.scrollTo({top:el.offsetTop - 65, behavior: "smooth"});                           
        }        
      }                 
      // повторный клик по пункту меню (не по якорной ссылке)
      if (url === window.location.pathname) {
        window.scrollTo({top:0, behavior: "smooth"});
      }
    },    
    showMenu(){
      this.active_menu = 'active_menu';
      this.active_scrim = 'active_scrim';                   
    },
    closeMenu(){
      this.active_menu = '';
      this.active_scrim = '';        
    },
    menuCreated(){
      if (window.matchMedia("(max-width: 768px)").matches) {
        this.menu = [
          [
            {url: '/', text: '', exact: false}
          ],
          [
            {url: '/#home_about_me', text: 'About me', exact: false},
            {url: '/relationships', text: 'Relationships', exact: false},
            {url: '/#home_users', text: 'Users', exact: false},
            {url: '/#home_sign_up', text: 'Sign Up', exact: false},
            {url: '/terms', text: 'Terms and Conditions', exact: false}           
          ],
          [
           {url: '/works', text: 'How it works', exact: false},
           {url: '/partnership', text: 'Partnership', exact: false},
           {url: '/help', text: 'Help', exact: false},
           {url: '/testimonial', text: 'Leave testimonial', exact: false},
           {url: '/contact', text: 'Contact us', exact: false}, 
          ],
          [
            {url: '/articles', text: 'Articles', exact: false},
            {url: '/news', text: 'Our news', exact: false},
            {url: '/testimonials', text: 'Testimonials', exact: false},
            {url: '/licenses', text: 'Licenses', exact: false},
            {url: '/privacy', text: 'Privacy Policy', exact: false},
          ]
        ];
      }else{
        this.menu = [
          [
            {url: '/#home_about_me', text: 'About me', exact: false},
            {url: '/relationships', text: 'Relationships', exact: false},
            {url: '/requirements', text: 'Requirements', exact: false},
            {url: '/#home_users', text: 'Users', exact: false},
            {url: '/#home_sign_up', text: 'Sign Up', exact: false}
          ]
        ];
      }       
    },     
  }
}
</script>

<style lang="scss">
@import './assets/css/reset.local.css';
@import './assets/css/normalize.css';
@import './assets/fonts/font.css'; 

$font: 'OpenSans-Regular';
$h1FontDesc: 50px/54px $font;
$h1FontTab: 40px/44px $font;
$h1FontMob: 30px/34px $font;
$h2Font: 24px/29px $font;
$pFont: 16px/24px $font;
$primaryColor: #ef5b4c;
$secondaryColor: #007bff;
$bgColor: #fff;
$bgColor2: #f9f9f3;
$buttonHoverBgColor: #d24335;
*{
  box-sizing: border-box;
}
html,
body {
  height: 100%;  
  font-family: $font;  
  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;   
} 
#app {     
  height: 100%;    
	display: flex;
	flex-direction: column;
	justify-content: space-between;   
} 
.header{
  position: fixed;
  top: 0;
  left: 0;     
  width: 100%;     
  background: $bgColor;   
  border-bottom: .5px solid #CED4DA;      
}
.main {
	flex: 1 0 auto;   
  padding: 60px 0 0 0;
}
.footer{
	flex: 0 0 auto;
  text-align: center;
  padding: 15px 0;
  border-top: 2px solid #ECECEC;  
  color: #4C4B4B; 
}
.content{  
  width: 100%;
  max-width: 1170px;
  margin: 0 auto; 
  padding: 0 28.5px;  
}
h1{
  font: $h1FontDesc;
}
h2{
  font: $h2Font;
}
p{
  font: $pFont;
}
a{
  &:hover{
    color: $primaryColor;
  }   
}
.router_link_activ_class{
  color: $secondaryColor;
}
.nav, .wrap_menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav{
  padding: 18px 0;
}
.menu_icon{
  display: none;
  &:hover{
    cursor: pointer;
  }
}
.menu_item{
  font-size: 14px;
  padding: 0 0 0 29px;
} 
@media screen and (max-width: 768px){   
  .menu_icon{
    display: block;
  }
  .menu{
    position: absolute;
    top: 0;     
    height: 100vh;
    left: -100%;
    background-color: $bgColor;     
    display: flex;
    flex-direction: column;     
    width: 80.5%;
    z-index: 1;     
    transition: 1s;
    overflow-y: auto; 
  }   
  .scrim {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;     
    transition-property: opacity;
    opacity: 0;
    background: rgba(22, 12, 13, .3);;
    z-index: -1;
    visibility: hidden;
  }
  .menu_section{
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #E1E1E1;
    padding: 25px 0 12px 14.5px;
    &:last-child {
      border-bottom: none;
    }
    &:first-child{
      padding: 21px 0 12px 14.5px;
      & .menu_item{
        padding: 0; 
      }
    }
  }   
  .menu_item{     
    font: $pFont;
    padding: 0 0 17.5px 0;  
    width: fit-content; 
  }
  .footer{
    & p{
      padding: 0 0 0 8px;
    }
  }
}
@media screen and (max-width: 360px){
  .content{
    padding: 0 14px;
  }
  .nav{
    padding: 10px 0 5px 0;
  }
  .main {     
    padding: 41px 0 0 0;
  }   
  .menu_section{
    &:first-child{
      padding: 10px 0 4px 14.5px;      
    }     
  }   
  .footer p {
    padding: 0;  
  }
}
.active_scrim {     
  visibility: visible;
  transition: 1s;
  opacity: 1;
  z-index: 0;
}
.active_menu{
  left: 0;
} 
 
</style>