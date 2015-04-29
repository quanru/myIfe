  window.onload=function(){
    var list=$("#list").getElementsByTagName('li'),
        index=0,
        timer=null;

      function auto(){
        timer=setInterval(function(){
          index++;
          if(index>=list.length){
            index=0;
          }
          change(index);
        },2000);  
      }
      auto();

      function change(curIndex){
        $("#pic").style.marginTop=-738*curIndex+'px';
        for(var n=0;n<list.length;n++){
            list[n].className='';
        }
          list[curIndex].className='on';
       }
       $(".wrap").onmouseover=function(){
          clearInterval(timer);
       }
       $(".wrap").onmouseout=auto;
       for(var i=0;i<list.length;i++){
          list[i].id=i;
          list[i].onmouseover=function(){
            change(this.id);          
          }
        }

   }
