<template>
  <transition name="modal">
    <div class="wrap_modal">
      <div class="container_modal">
        <div class="header_modal">
          <p class="title_modal">
            <slot name="header">Congratulations</slot>
          </p>
          <p class="wrap_icon_closed_modal">
            <img class="icon_closed_modal" @click="$emit('close')" src="../assets/img/close-black-18dp.svg" alt="">
          </p> 
        </div>
        <div class="main_modal">
          <p class="content_main_modal">
            <slot name="main">You have successfully passed the registration</slot>
          </p>
        </div>
        <div class="footer_modal">
          <button class="button_modal" type="button" @click="$emit('close')">
            <slot name="footer">Great</slot>
          </button>
        </div>
      </div>      
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal'   
}
</script>
 
<style scoped lang="scss"> 
.wrap_modal{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(127, 127, 127, .6);;   
  transition: opacity 0.3s ease;  
  display: flex;
  justify-content: center;
  align-items: center; 
}
.container_modal{
  width: 394px;   
  background: #ffff;
  border-radius: 2px;
}
.header_modal{
  padding: 15px 10px 16px 17px;
  border-bottom: 2px solid #ECEEF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon_closed_modal{   
  &:hover{
    cursor: pointer;
  }
}
.title_modal{
  font: 24px/29px 'OpenSans-Regular';
}
.wrap_icon_closed_modal{
  display: flex;
  flex-direction: column;
  justify-content: center;  
}
.main_modal{
  padding: 16px 10px 16px 17px;
  border-bottom: 2px solid #ECEEF1;
}
.content_main_modal{
  font: 16px/24px 'OpenSans-Regular';
  color: #4C4B4B;
}
.footer_modal{
  padding: 16px 16px 16px 16px;
}
.button_modal{
  display: block;
  outline: none;
  padding: 7px 19px 7px 19px;
  background: #EF5B4C;
  font: 16px/24px 'OpenSans-Regular';
  color: #fff;
  margin-left: auto;
  border-radius: 2px;
  &:hover{     
    background-color: #d24335;     
  }
}

@media screen and(max-width: 410px){
  .container_modal{
    width: 100%;   
  }
  .wrap_modal{
    padding: 0 15px;
  } 
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>