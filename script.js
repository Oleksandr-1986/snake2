function game(){
  
  const canvas = document.getElementById('draw');
  
  if(canvas.getContext){
    
    const ctx = canvas.getContext('2d');     
    const scale = 15;
    const select = document.querySelector('#select');
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;
    const score = document.querySelector('.score');
    const more = document.querySelector('.more');

    
    let snake = new Snake();
    let fruit = new Fruit();
    let color;
    let intDuration = select.value;
    let int = setInterval(update,intDuration);
    
    fruit.changeLocation();
    
    function update(){
      
      ctx.clearRect(0,0, canvas.width, canvas.height);
                    
      fruit.draw();    
      snake.create();
      snake.draw();
      
      if(snake.eatFruit(fruit)){
        
        fruit.changeLocation();
        fruit.changeColor();
        
      }
      
      snake.score();      
      snake.eatTail();
         
      
    };
  const btns = document.querySelectorAll('span');
  	
    btns.forEach(function(btn){
      
      btn.addEventListener('click', function(e){
                           
   	    const direction = btn.className;  
        
        snake.changeDirection(direction);
                   
      });
    
    });    
  
    
    function Snake(){
      
      this.x = 9 * scale;
      this.y = 9 * scale;
      this.speedX = scale * 1;
      this.speedY = 0;
      this.total = 0;
      this.tail =[]; 
          
     
      this.draw = function(){
        
        for( let i = 0; i < this.tail.length; i++){
          
          if(i != 0){
            
          ctx.fillStyle ='#046d0d';
          ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
          ctx.fillStyle = 'black';
          ctx.fillRect(this.tail[i].x + scale / 4, this.tail[i].y + scale / 4, scale / 2, scale / 2);
            
          }else{
            
            ctx.fillStyle ='#f70909';
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            
          }
        }
        
        
        ctx.fillStyle ='black';
        ctx.fillRect(this.x, this.y, scale, scale);
        
      };
      
      this.create = function(){     
        
        for( let i = 0; i < this.tail.length - 1; i++){
          this.tail[i] = this.tail[i + 1];
        }
        
        this.tail[this.total-1] = {x:this.x, y:this.y};
        
        this.x += this.speedX;
        this.y += this.speedY;
                
        if(this.x > canvas.width){
          this.x = 0;
        }
        if(this.x < 0){
          this.x = canvas.width;
        }
        if(this.y > canvas.height){
          this.y = 0;
        }
        if(this.y < 0){
          this.y = canvas.height;
        }
        
      };
        
      this.changeDirection = function(direction){
          
        if(direction === 'up'&& this.speedY != scale * 1 && this.x >= 0 && this.x < canvas.width){
             
           this.speedX = 0;
           this.speedY = - scale * 1;
          
        }
        
        if(direction === 'down' &&  this.speedY != - scale * 1 && this.x >= 0 && this.x < canvas.width){
             
           this.speedX = 0;
           this.speedY =  scale * 1;
          
        }
        
        if(direction === 'right' && this.speedX != - scale * 1 && this.y >= 0 && this.y < canvas.height){
             
           this.speedX = scale * 1;
           this.speedY = 0;
          
        }
        if(direction === 'left' && this.speedX !=  scale * 1 && this.y >= 0 && this.y < canvas.height){
             
           this.speedX = - scale * 1;
           this.speedY = 0;
          
        }
        
      };
      
      this.eatFruit = function(fruit){
        
        if(this.x === fruit.x && this.y === fruit.y){
          
          this.total++;   
          return true;
          
        }else{
          
          return false;
          
        }
      };     
     
      this.score = function(){
        
        score.textContent = this.total;
        
        if(this.total > 3){    
          
           more.style.display ='inline-block';
          
        }
        
      };
      
      this.eatTail = function(){
      
        for( let i = 0; i < this.tail.length; i++){
          
          if(this.x === this.tail[i].x && this.y === this.tail[i].y ){
            
           clearInterval(int);
           btn.style.display ='inline-block';
           overGame.textContent ='Game over :(. Try again';
     
          }
          
        } 
        
      };
      
    };
    
    function Fruit(){
      
      this.x
      this.y
          
      this.changeLocation = function (){
        
        this.x =(Math.floor(Math.random() * columns - 1) + 1) * scale;
        this.y =(Math.floor(Math.random() * rows - 1) + 1) * scale;
        
      };
      
      this.changeColor = function(){
        
        color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        return  color;
        
      }  
      
      this.draw = function(){ 
        
        ctx.fillStyle ="#008000";
        ctx.fillRect(this.x + scale/2, this.y- scale/4, scale/4, scale/4 );
        ctx.fillStyle ='red';
        ctx.fillStyle = color;       
        ctx.beginPath();
        ctx.arc(this.x + scale/2, this.y + scale/2, scale/2, 0,  2 * Math.PI);
        ctx.closePath();
        ctx.fill();           
      
      };
    };
  
  }
};

const btn = document.querySelector('.btn');
const overGame = document.querySelector('.game-over');

btn.addEventListener('click', function(){
  
  game();
  overGame.textContent =' ';
  btn.style.display ='none';
  
});
