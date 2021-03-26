<template>
  <div>     
    <div class="home_banner">
      <div class="content">
        <h1 class="home_banner_title">Test assignment for Frontend Developer position</h1>
        <p class="home_banner_subtitle">{{subtitle}}</p>
        <router-link
          to="/#home_sign_up"
          class="home_banner_button"
          tag="button"  
          v-on:click.native="scrollBehaviorHash('/#home_sign_up')"       
        >Sing up now</router-link>           
      </div>
    </div>
    <div class="home_me">
      <div class="content">
        <h2 class="home_section_title" id="home_about_me" ref="home_about_me" data-hash="hash">Let's get acquainted</h2>
        <div class="hm_me_wrap_txt">
          <div class="left"><img src="../assets/img/man-laptop-v1.svg" alt=""></div>
          <div class="right">
            <p class="hm_me_right_one">I am cool frontend developer</p>
            <p class="hm_me_right_two">We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.
            </p>
            <p class="hm_me_right_three">If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.</p>
            <router-link
            to="/#home_sign_up"
            class="home_me_button"
            tag="button"
            v-on:click.native="scrollBehaviorHash('/#home_sign_up')"
            >Sing up now</router-link>
          </div>
        </div>
      </div>
    </div>   
    <div class="home_users">
      <div class="content">
        <h2 id="home_users" ref="home_users" data-hash="hash" class="home_section_title">Our cheerful users</h2>
        <p class="home_section_subtitle">Attention! Sorting users by registration date</p>
        <div class="home_users_cards">
          <div class="hm_user_card" v-for="user in users" :key="user.id">
            <div class="hw_user_card_container">
              <div class="wrap_card_foto">
                <div class="hw_user_card_foto">
                  <img :src="user.photo" alt="">                   
                </div>
              </div>
              <p class="hm_user_card_name">{{user.name}}</p>
              <p class="hm_user_card_role">{{user.position}}</p>
              <p class="hm_user_card_email" @mouseover="initTooltip($event,  user.email)">
                {{user.email}}
              </p>
              <p class="hm_user_card_phone">{{user.phone}}</p> 
            </div>            
          </div>
          <Tooltip ref="tooltip" />          
        </div> 
        <button class="hm_users_button" v-if="visibilityUsersButton" @click="showMoreUsers" type="button">Show more</button>
      </div>         
    </div>
    <div class="home_registration">
      <div class="content">
        <h2 id="home_sign_up" ref="home_sign_up" data-hash="hash" class="home_section_title">Register to get a work</h2>         
          <form ref="form_registration" class="hm_registration_form" enctype="multipart/form-data">
            <p class="home_section_subtitle">Attention! After successful registration and alert, update the list of users in the block from the top</p> 
            <div class="form_row">
              <label class="label" for="">Name</label>
              <input class="input" name="name"
              v-model.trim="name.value" :class="name.inputErrClass" @change="changeInput"
              type="text" placeholder="Your name">
              <p class="form_error">{{error.name}}</p>
            </div>
            <div class="form_row">
              <label class="label" for="">Email</label>
              <input class="input" name="email"
              v-model.trim="email.value" :class="email.inputErrClass"  @change="changeInput"
              type="email" placeholder="Your email">
              <p class="form_error">{{error.email}}</p>
            </div>
            <div class="form_row">
              <label class="label" for="">Phone number</label>
              <input class="input input_tel" name="phone"
              v-model.trim="phone.value" :class="phone.inputErrClass" @change="changeInput"
              type="text" placeholder="+380 XX XXX XX XX">
              <p class="form_error">{{error.phone}}</p>
              <p class="assitive_text">Еnter phone number in open format</p>
            </div>
            <div class="user_position">
              <p class="user_position_title">Select your position</p>
              <div class="form_radio_row" v-for="value in positions" :key="value.id">
                <input :id="'radio-' + value.id"
                name="position_id"                 
                v-model.trim="position_id.value" @change="changeInput"
                class="input_radio"
                type="radio"
                :value="value.id">
                <label :for="'radio-' + value.id" class="label_radio">{{value.name}}</label>
              </div> 
              <p class="form_error">{{error.position_id}}</p>              
            </div> 
            <div class="form_row">
              <label class="label" for="">Photo</label>
              <input type="file" class="file_input" @change="changeInput" :class="photo.inputErrClass" name="photo" id="hm_img_file" accept="image/*" />
              <div class="fild_file">
                <p class="file_name">{{file_name}}</p>
                <label for="hm_img_file" class="file_label" @click="clickFileLabel">Browse</label>
              </div> 
              <p class="form_error">{{error.photo}}</p>              
            </div>          
            <button type="button" @click="sendFormRegistration" class="home_banner_button">Sing up now</button>
          </form>         
      </div>                   
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        {{modal.header}} 
      </template> 
      <template v-slot:main>
        {{modal.main}} 
      </template>        
    </Modal>        
  </div>     
</template>

<script> 
import store from '../store'; 
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

import Tooltip from '@/components/Tooltip.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Home',
  components: {
    Tooltip,
    Modal     
  },
  data(){
    return {
      showModal: false,
      modal: {
        header: '',
        main: '',
      },
      subtitle: '',        
      file_name: 'Upload your photo',
      users: [],
      page_users: 0,
      count_users: window.matchMedia("(max-width: 540px)").matches ? 3 : 6,
      visibilityUsersButton: true,
      error: {},
      name: {
        value: '',
        inputErrClass: ''
      },
      email: {
        value: '',
        inputErrClass: ''
      },
      phone: {
        value: '',
        inputErrClass: ''
      },
      position_id: {
        value: ''         
      }, 
      photo: {         
        inputErrClass: ''
      }       
    }
  },
  async created(){
    this.createSubtitle();
    window.addEventListener('resize', this.createSubtitle); 
    await  this.$store.dispatch('users/getTotalUsers');
    await  this.$store.dispatch('users/getUsers');    
    this.users = this.allUsers.slice(this.page_users, this.count_users);
    this.$store.dispatch('users/getPositions');         
  },    
  mounted(){     
    window.addEventListener('scroll', this.changeTargetItemMenu);      
  },   
  destroyed(){		 
		window.removeEventListener('resize', this.createSubtitle);	
    window.removeEventListener('scroll', this.changeTargetItemMenu);
    this.users = [];
    this.page_users = 0;
    this.visibilityUsersButton = true;	 
	},  
  computed: {
    ...mapGetters('users', {
			allUsers: 'users'
		}),
    ...mapGetters('users', {
			positions: 'positions'
		}),
    ...mapGetters('users', {
			imgMetrics: 'imgMetrics'
		}),
    ...mapGetters('global', {
			target_item_menu: 'target_item_menu'
		})      
  }, 
  methods: {
    ...mapActions('users', ['registration', 'getTotalUsers', 'getUsers']),
    changeInput(e){
      if (e.target.getAttribute('name') == 'name') {
        if(/^[a-zA-Z\s]{2,60}$/g.test((e.target.value).trim())) {
          this.$delete(this.error, 'name'); 
          this.name.inputErrClass = '';         
        }else{
          this.$set(this.error, 'name', "The name must be at least 2 characters."); 
          this.name.inputErrClass = 'form_input_error';
        }         
      }
      if (e.target.getAttribute('name') == 'email') {
        if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,100}))$/g.test((e.target.value).trim())) {
          this.$delete(this.error, 'email'); 
          this.email.inputErrClass = '';         
        }else{
          this.$set(this.error, 'email', "The email must be a valid email address."); 
          this.email.inputErrClass = 'form_input_error';
        }         
      }
      if (e.target.getAttribute('name') == 'phone') {
        if(/^[\+]{0,1}380([0-9]{9})$/g.test((e.target.value).trim())) {
          this.$delete(this.error, 'phone'); 
          this.phone.inputErrClass = '';         
        }else{
          this.$set(this.error, 'phone', "The phone field is required."); 
          this.phone.inputErrClass = 'form_input_error';
        }         
      }
      if (e.target.getAttribute('name') == 'position_id') {
        this.$delete(this.error, 'position_id');        
      }
      if (e.target.getAttribute('name') == 'photo') {           
        if (e.target.value !== '') {
          let file = e.target.files[0];
          let img = document.createElement('img');
          let objectURL = URL.createObjectURL(file);     
          img.src = objectURL;            
          img.onload =  async function() {              
            let metrics = {width: this.width, height: this.height};             
            await store.dispatch('users/setImgMetrics', metrics);              
            URL.revokeObjectURL(this.src);             
          }
          if (file.size <= 5000000 && file.type == "image/jpeg" || file.type == "image/jpg"
               && this.imgMetrics.width >= 70 && this.imgMetrics.height >= 70) {             
            this.file_name = file.name;
            this.$delete(this.error, 'photo'); 
            this.photo.inputErrClass = ''; 
          }else{
            this.file_name = 'No file chosen'; 
            this.$set(this.error, 'photo', "Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb."); 
            this.photo.inputErrClass = 'class_fild_file_err'; 
          }           
        }else{
          this.file_name = 'No file chosen'; 
          this.$set(this.error, 'photo', "No file chosen."); 
          this.photo.inputErrClass = 'class_fild_file_err';        
        }         
      }
    },
    async sendFormRegistration(){
      if(/^[a-zA-Z\s]{2,60}$/g.test((this.name.value).trim())) {
          this.$delete(this.error, 'name'); 
          this.name.inputErrClass = '';         
      }else{
        this.$set(this.error, 'name', "The name must be at least 2 characters."); 
        this.name.inputErrClass = 'form_input_error';
      } 
      if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,100}))$/g.test((this.email.value).trim())) {
          this.$delete(this.error, 'email'); 
          this.email.inputErrClass = '';         
      }else{
        this.$set(this.error, 'email', "The email must be a valid email address."); 
        this.email.inputErrClass = 'form_input_error';
      }
      if(/^[\+]{0,1}380([0-9]{9})$/g.test((this.phone.value).trim())) {
          this.$delete(this.error, 'phone'); 
          this.phone.inputErrClass = '';         
      }else{
        this.$set(this.error, 'phone', "The phone field is required."); 
        this.phone.inputErrClass = 'form_input_error';
      }
      if(/^[1-9]{1,4}$/g.test((this.position_id.value))) {
        this.$delete(this.error, 'position_id');                    
      }else{
        this.$set(this.error, 'position_id', "Select your position.");          
      }
      if (this.file_name !== 'Upload your photo' && this.file_name !== 'No file chosen' 
          && !this.error.hasOwnProperty('photo')) {          
        this.$delete(this.error, 'photo'); 
        this.photo.inputErrClass = '';                   
      }else{
        this.file_name = 'No file chosen'; 
        if (!this.error.hasOwnProperty('photo')) {
          this.$set(this.error, 'photo', "No file chosen."); 
        }          
        this.photo.inputErrClass = 'class_fild_file_err';        
      } 
      if (Object.keys(this.error).length === 0 && this.error.constructor === Object) { 
        let formData = new FormData(this.$refs.form_registration);
        let res = await this.registration(formData);
        if (res === 1) {
          this.modal.header = 'Rejected';
          this.modal.main = 'Try later';
          this.showModal = true;
        }else{
          if (res &&  res.data && res.data.success) {           
            this.users = [];
            this.page_users = 0;
            this.visibilityUsersButton = true;
            this.modal.header = 'Congratulations';
            this.modal.main = 'You have successfully passed the registration';
            this.showModal = true;
            this.file_name = 'Upload your photo';
            this.name.value = '';
            this.email.value = '';
            this.phone.value = '';
            this.position_id.value = '';
            await this.getTotalUsers();
            await this.getUsers();
            this.users = this.allUsers.slice(this.page_users, this.count_users);
            this.$router.push({ path: '/#home_users' },  ()  =>  {});
          }else{
            if (res && res.response.status == 401  ) {
              localStorage.removeItem('token');
              localStorage.removeItem('token_exp');
              this.modal.header = 'Rejected';
              this.modal.main = 'Registration is not available';
              this.showModal = true;              
            }else if (res && res.response.status == 409  ) {
              this.modal.header = 'Rejected';
              this.modal.main = 'User with this phone or email already exist';
              this.showModal = true;                
            }else if (res && res.response.status == 422  ) {
              for (const key in res.response.data.fails) {               
                this.$set(this.error, key, res.response.data.fails[key].join(';'));
              }                
            }
          }
        }         
      }
    },
    showMoreUsers(){       
      if (this.page_users < [...this.allUsers].length-this.count_users) {
        this.page_users = this.page_users + this.count_users;               
        let res = [...this.allUsers].splice(this.page_users, this.count_users);       
        this.users = [...this.users, ...res];
      }
      if (this.page_users >= [...this.allUsers].length-this.count_users) { 
        this.visibilityUsersButton = false;
      }       
    },
    changeTargetItemMenu(){ //подсветка якорных ссылок при скролле
      let arrHash = [];
      for (let key in this.$refs) {         
        if (this.$refs[key].dataset && this.$refs[key].dataset.hash=='hash') {
          arrHash.push(key);                   
        }         
      }       
      let path = '';        
      for (let i of arrHash) {         
        if (window.scrollY >= this.$refs[i].offsetTop - 75 && window.scrollY <= this.$refs[i].offsetTop + this.$refs[i].parentNode.offsetHeight) {
          path = '/#'+i;   
          if (path != this.target_item_menu) { //ограничение множественного вызова dispatch
            this.$store.dispatch('global/target_item_menu',  path);                              
          }                             
        }                    
      }        
      // убираем подсветку первой якорной ссылки
      if (window.scrollY < this.$refs[arrHash[0]].offsetTop - 75) {
        this.$store.dispatch('global/target_item_menu', '');          
      }                   
    },   
    scrollBehaviorHash(url) { // переход по якорной ссылке при каждом клике      
      if (this.$route.hash != '' && window.location.hash === this.$route.hash) {         
        let el = document.getElementById(this.$route.hash.slice(1));
        if (el) {
          window.scrollTo({top:el.offsetTop - 65, behavior: "smooth"});           
        }        
      }        
      this.$store.dispatch('global/target_item_menu', url);  //подсветка активного пункта меню    
    },   
    createSubtitle(){
      if (window.matchMedia("(max-width: 400px)").matches) {
        this.subtitle = 'We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository.';
      }else{
        this.subtitle = 'We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck! The photo has to scale in the banner area on the different screens';
      }
    },
    initTooltip(e, data){
      this.$refs.tooltip.init(e.target,data);
    },
    clickFileLabel(){       
      if (this.file_name == 'Upload your photo') {
        this.file_name = 'No file chosen';
      }       
    }     
  }
}
</script>

<style lang="scss">
// banner_start
.home_banner{
  width: 100%;
  max-width: 2560px;  
  margin: 0 auto;  
  background-image: url('../assets/img/banner-photo.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 105px 0 113px 0;   
  color: #fff;
}
.home_banner_title{   
  max-width: 510px;
  text-transform: uppercase;    
  letter-spacing: -0.6px; 
}
.home_banner_subtitle{
  max-width: 535px;
  padding: 28px 0 33px 0;   
}
.home_banner_button{  
  background: #ef5b4c;
  border-radius: 5px;
  padding: 8px 60px;
  outline: none;
  color: #fff;
  &:hover{
    cursor: pointer;
    background-color: #d24335;     
  }
}
// banner end
// about me start
.home_section_title{
  font: 50px/54px 'OpenSans-Regular';
  color: #212529;
  text-align: center;
}
.home_me{   
  padding: 153px 0 154px 0;
  & .home_section_title{
    padding: 0 0 50px 0;
    letter-spacing: -.5px;
  }
}
.hm_me_wrap_txt{
  display: flex;
  justify-content: space-between;
  padding: 18px 0 0 0;
  & .left{
    width: 38%;
    padding: 0 0 0 23px;     
      & img{
        object-fit: contain;
        width: 100%;
        height: auto;
      }
  }
  & .right{
    width: 57%;     
    & .hm_me_right_one{       
      font: 24px/29px 'OpenSans-Regular';
      font-weight: bold;
      padding: 0 0 20px 0;
    }
    & .hm_me_right_two{ 
      color: #4C4B4B;       
      padding: 0 0 23px 0;
      letter-spacing: -.05px;
      text-align: justify;
    }
    & .hm_me_right_three{ 
      color: #4C4B4B;       
      padding: 0 0 30px 0; 
      text-align: justify;          
    }
  }
}
.home_me_button{
  font-weight: bold;
  outline: none;
  color: #ef5b4c;
  letter-spacing: .2px; 
  &:hover{
    color: #d24335;
  }
}
// about me end
// users start
.home_users{
  background-color: #f9f9f3;
  padding: 152px 0 159px 0;
}
.home_section_subtitle{
  text-align: center;
  padding: 17px 0 75px 0;
  color: #4C4B4B;
}
.home_users_cards{
  display: flex;
  flex-wrap: wrap;    
}
.hm_user_card{   
  box-sizing: border-box;
  padding: 0px 0px 50px 0px;
  margin: 0 10px;
  width: calc(33.3% - 20px);   
} 
.hw_user_card_container{
  width: 100%;
  max-width: 205px;
  margin: 0 auto;
  color: #4C4B4B;
  text-align: center;
}
.wrap_card_foto{   
  padding: 0px 0 11px 0;
}
.hw_user_card_foto{  
  display: inline-block; 
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  & img{
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;     
  }
}
.hm_user_card_name{
  padding: 0px 0 8px 0;
  font: 24px/29px 'OpenSans-Regular';   
  color: #212529; 
}
.hm_user_card_email{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover{
    cursor: pointer;
  }
}
.hm_users_button{
  outline: none;
  display: block;
  background-color: #ef5b4c;
  color: #fff;
  margin: -15px auto 0 auto;
  padding: 9px 62px;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
    background-color: #d24335;
  }
}
// users end
// registration start
.home_registration{
  padding: 150px 0 165px 0;
  & .home_section_subtitle{   
    padding: 17px 0 28px 0;   
  }
} 
.hm_registration_form {     
  max-width: 467px;
  margin: 0 auto;    
  & .user_position{
    padding: 0px 0 10px 0;
    margin: -5px 0 0 0;
    font: 16px/24px 'OpenSans-Regular';
    & .user_position_title{
      padding: 0 0 15px 0;
      letter-spacing: -0.65px;
    }
    & .form_radio_row{
      padding: 0 0 4px 0;
      & .input_radio{
        display: none;
      }
      & .input_radio:checked + .label_radio:before{         
        border: 5px solid #007BFF;         
      }
      & .label_radio{                 
        display: inline-flex;
        align-items: center;
        letter-spacing: -0.8px;
        &:hover{
          cursor: pointer;
        }
      }
      & .label_radio:before{
        content: '';
        display: block;
        margin: 0 10px 0 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid #B2B9C0;         
      }
    }
  }
  & .file_input{        
    position: absolute; 
    z-index: -1; 
    transform: scale(0);
    &:focus + .fild_file{
      border: 1px solid  rgb(79, 79, 223)  ;
      box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);
    }
    &:focus + .fild_file .file_label{
      border-left: 1px solid  rgb(79, 79, 223);
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }               
  }   
  & .fild_file{         
    border: 1px solid #CED4DA;
    border-radius: 5px;
    display: -webkit-flex;
    display: flex;   
    flex-wrap: nowrap;   
    justify-content: space-between;       
    & .file_name{       
      flex: 1 ;        
      padding: 6px 5px 6px 13px;
      color: #B2B9C0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;                      
    }
    & .file_label{       
      padding: 5px 15px 5px 15px;
      background-color: #F8F7F5DE;
      border-left: 1px solid #CED4DA;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      &:hover{
        cursor: pointer;
      }      
    }
  }
  & .home_banner_button{
    display: block;
    margin: 18px auto 0 auto;
  }
}  
.form_row{
  font: 14px/24px 'OpenSans-Regular';
  letter-spacing: .3px;
  padding: 0 0 22px 0;
  & .label{     
    display: block;
    padding: 0 0 7px 0;
    color: #212529;
  }
  & .input{                  
    width: 100%;
    padding: 8px 14px 8px 14px;
    border: 1px solid  #CED4DA;
    border-radius: 5px;   
    outline: none; 
    color: #212529;   
    &::placeholder{
      color: #B2B9C0;
    }
    &:focus{
      border: 1px solid  rgb(79, 79, 223);
      box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);       
    }
  }
  & .input_tel{
    letter-spacing: 1.25px;
  }
  & .assitive_text{
    padding: 2px 0 0px 0;
    font-size: 12px;
    letter-spacing: .05px;
  }
}
// классы ошибок формы регистрации 
.form_error{
  color: red;
  font-size: 12px;
}
.form_input_error{
  border: 1px solid red !important;
  &:focus{
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(233 104 102 / 60%) !important;
  }
}
.class_fild_file_err{
  & + .fild_file{
    border: 1px solid  red !important;
    & .file_label{
      border-left: 1px solid red !important;
    }
  }
  &:focus + .fild_file{       
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(233 104 102 / 60%) !important;
  }
  &:focus + .fild_file .file_label{
    border-left: 1px solid red !important;       
  }   
} 
// end классов ошибок формы регистрации

// registration end

@media screen and (max-width: 768px){   
  .home_banner{
    padding: 58px 0 65px 0;
  }
  .home_banner_title{   
    font: 40px/44px  'OpenSans-Regular';
    max-width: 410px;
  }
  .home_banner_subtitle{
    font: 16px/24px  'OpenSans-Regular';
    max-width: 450px;   
  }
  .home_banner {   
    background-size: 134%;     
    background-position: top left;
  }
   
  .home_section_title{
    font: 40px/44px 'OpenSans-Regular';   
  }
  .home_me{   
    padding: 115px 0 113px 0;   
  }
  .hm_me_wrap_txt{      
    & .left{
      width: 35%;
      padding: 0;         
    }
    & .right{
      width: 61%;        
      & .hm_me_right_two{          
        letter-spacing: 0;         
      }
      & .hm_me_right_three{ 
        letter-spacing: -.1px;      
      }
    }
  }

  .home_users {     
    padding: 116px 0 116px 0;
  }
  .hm_user_card {    
    padding: 0px 0px 60px 0px;     
  }
  .hm_users_button {     
    margin: -23px auto 0 auto;     
  }


  .home_registration {
    padding: 114px 0 118px 7px;
  }
  .home_registration .home_section_subtitle {
    padding: 17px 0 25px 0;
  }
  .form_row {     
    padding: 0 0 21px 0;
    font: 14px/26px "OpenSans-Regular";
    letter-spacing: 0.4px;
    & .assitive_text {
      padding: 0px 0 0px 0;       
      letter-spacing: -0.6px;
    }
  }
  .hm_registration_form .fild_file .file_name {
    padding: 5px 5px 6px 13px;     
  }
  .hm_registration_form .fild_file .file_label {
    padding: 5px 14px 5px 15px;     
  }   
}
@media screen and (max-width: 720px){  
  .hm_user_card {     
    width: calc(50% - 20px);
  }
}
@media screen and (max-width: 640px){
  .home_banner {   
    background-size: cover;       
    background-position: center;
  }
}
@media screen and (max-width: 530px){
  .home_users {
    padding: 74px 0 75px 0;
    & .home_section_subtitle {     
      padding: 9px 0 37px 0;
    }
  }
  .home_users_cards {
    display: block;
  }
  .hm_user_card {
    width: 100%;
    margin: 0;
    padding: 0 0 38px 0;
  }
  .hm_users_button {
    margin: -3px auto 0 auto ;
  }
}
@media screen and (max-width: 500px){
  .home_banner{
    padding: 68px 0 73px 0;
    text-align: center;
  }
  .home_banner_title{   
    font: 30px/34px  'OpenSans-Regular';
    max-width: 100%;     
    letter-spacing: 0px;
  }
  .home_banner_subtitle{     
    max-width: 100%;      
    padding: 20px 0 25px 0;
  }
  
  .home_me{   
    padding: 77px 0 76px 0;
    & .home_section_title{      
      padding: 0 0 15px 0; 
  }   
  }   
  .hm_me_wrap_txt{   
    display: block;
    text-align: center;   
    & .left{       
      width: 100%;
      padding: 0px 18px 0px 22px;         
    }
    & .right{
      width: 100%; 
      & .hm_me_right_one{ 
        padding: 30px 0 20px 0;         
        letter-spacing: .15px;         
      }       
      & .hm_me_right_two{          
        letter-spacing: -.1px;         
      }      
    }
  }    
}
@media screen and (max-width: 360px){   
  .home_banner_title{      
    max-width: 327px;      
  }   

  .home_section_title{
    font: 30px/34px 'OpenSans-Regular';      
  }
  
  .home_registration {
    padding: 79px 0 81px 0;
    & .home_section_subtitle {
      padding: 17px 12px 25px 12px;
    }     
  }
  .form_row {
    padding: 0 1px 21px 0;    
    & .label {     
      padding: 0 0 6px 0;     
    }
    & .assitive_text {
      padding: 1px 0px 0px 0;
      letter-spacing: -0.65px;
    }
  } 
  .hm_registration_form{
    & .user_position {
      & .user_position_title{
        padding: 0 0 16px 0;
        letter-spacing: -0.6px;
      }     
      & .form_radio_row .label_radio:before {     
        margin: 0 8px 0 1px;     
      }
    }
    & .fild_file .file_label {
      padding: 5px 15px 5px 15px;
    }
  }   
}
// для Retina на мобильных устройствах
@media
only screen and (-webkit-min-device-pixel-ratio: 2)      and (max-width: 360px),
only screen and (   min--moz-device-pixel-ratio: 2)      and (max-width: 360px),
only screen and (     -o-min-device-pixel-ratio: 2/1)    and (max-width: 360px),
only screen and (        min-device-pixel-ratio: 2)      and (max-width: 360px),
only screen and (                min-resolution: 192dpi) and (max-width: 360px),
only screen and (                min-resolution: 2dppx)  and (max-width: 360px) { 
  .home_banner {     
    background-image: url('../assets/img/banner-photo@2x360.jpg');
  }
}
 
</style>