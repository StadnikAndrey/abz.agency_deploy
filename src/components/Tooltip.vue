<template>
  <div>       
  </div>
</template>

<script>
export default {
  name: 'Tooltip',    
  methods: {
    init(target, data){
      let tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';       
      tooltipElem.innerHTML = data;
      document.body.append(tooltipElem);
       
      let coords = target.getBoundingClientRect();
       
      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0; // не заезжать за левый край окна
 
      let top = coords.top + tooltipElem.offsetHeight + 15;      
      // если подсказка не помещается снизу, то отображать её сверху
      if (document.documentElement.clientHeight - top < tooltipElem.offsetHeight+15) {
        top = coords.top - tooltipElem.offsetHeight - 15;         
      } 

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';

      window.document.onmouseout = function(e) {
        if (tooltipElem) {
          tooltipElem.remove();
          tooltipElem = null;
        }
      };       
    }
  }
}
</script>
 
<style lang="scss">
.tooltip {       
  position: fixed;   
  padding: 6px 9px;
  border: 1px solid #b3c9ce;
  border-radius: 5px;
  text-align: center;
  font-size: 13px;
  color: #FEFEFE;
  background: #323231;
  -webkit-box-shadow: 7px 8px 9px -4px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 7px 8px 9px -4px rgba(34, 60, 80, 0.2);
  box-shadow: 7px 8px 9px -4px rgba(34, 60, 80, 0.2);  
}
</style>