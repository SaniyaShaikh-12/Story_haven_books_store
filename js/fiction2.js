let iconCart = document.querySelector('.cart');
document.querySelector('#cart-btn').onclick = () =>{
iconCart.classList.toggle('active');

}
document.querySelector('#close-cart-btn').onclick = ()=>{
iconCart.classList.remove('active');
}
function img(anything) {
 document.querySelector('.slide').src = anything;
}

function change(change) {
 const line = document.querySelector('.home');
 line.style.background = change;
}


 $(document).ready(function() {
   $('#autoWidth').lightSlider({
       autoWidth:true,
       loop:true,
       onSliderLoad: function() {
           $('#autoWidth').removeClass('cS-hidden');
       } 
   });  
 });
 let container  = document.querySelectorAll('.container flex .left');
container.forEach(left => {
  left.addEventListener('click', function(event){
    if(event.target.classList.contains('btn')){
      var leftNew = left.cloneNode(true);
      

      let listCart =  document.querySelectorAll('.cart .left')
      listCart.forEach(cart =>{
        if(cart.getAttribute('data-key') == contentNew.getAttribute('data-key')){
        
        }
      })
     
         document.querySelector('.listCart').appendChild(leftNew);
      
    }
  })
})
function Remove($key){
  let listCart = document.querySelectorAll('.cart .left');
  listCart.forEach(content => {
    if(content.getAttribute('data-key') == $key){
      content.remove();
      return;
}
 })
}