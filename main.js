
/*creamos un función que le asignamos dos parametros  del contructor el alto y ancho del pizarrón*/
(function(){
    self.Board = function(width, height) {
           this.width = width;
           this.height = height;           
           this.bars = [];
           this.playing = false;
           this.game_over = false;
           this.ball = null;
       }
/* Creamos un objeto JSON para declarar diferentes funciones o métodos para el prototype y agregamos la pelota*/
       self.Board.prototype ={
       get elements(){
           var elements = this.bars;
           elements.push(this.ball);
           return elements;

           }
       }
})();
(function () {
    /* creamos la clase BoardViem y recibe el canvas y un objeto de la clase board*/
    self.BoardView = function (canvas,board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");        
    } 

    /* Funciones dibujo, limpiar*/
    self.BoardView.prototype = {
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw : function (){
        for (var i = this.board.elements.length - 1; i >= 0; i--) {
            var el = this.board.elements[i];
            draw(this.ctx, el);                
          };
       },
       play: function(){
        this.clean();
        this.draw();

       }
    }
    /* Funcion para recibir los parametros de las barras en x,y,ancho y alto y el dibujo de las barras*/
    function draw (ctx,element){  
       
           switch(element.kind){
             case "rectangle":
              ctx.fillRect(element.x,element.y,element.width,element.height);
              break;
              case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y,element.radius,0,7);
                ctx.fill();
                ctx.closePath();
                break;
             }  
       
       
        }
})();
//Creamos la funcion de la pelota de PingPong
(function(){
    self.ball= function (x,y,radius,board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board; 
        board.ball = this;
        this.kind = "circle"  
    }

})();

(function () {
    /* creamos la clase bar para las barras rectangulares del juego*/
    self.Bar = function (x,y,width,height,board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";  
        this.speed = 6;
             
    }
    /* Función para moviemiento de las barras*/
    self.Bar.prototype = {
        down: function () {   
            this.y += this.speed;
                   
        },
        up: function () {  
            this.y -= this.speed; 
                   
        },
        toString: function(){
         return "x: "+ this.x +" y: "+ this.y;
        }
       
    }
})();
// Instanciamos los objetos 
var board = new Board(800,400);
var bar = new Bar(20,100,40,100, board);
var bar_2 = new Bar(735,100,40,100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball = new ball (350, 100, 10, board );

/*creamos la clases*/



/* crear evento con el keydown para que el jugador presiona teclas para jugar al PING PONG*/
document.addEventListener("keydown",function (ev){
    ev.preventDefault();
    if(ev.keyCode == 38){
        bar.up();
     }
     else if(ev.keyCode == 40){
         bar.down();
     }else if(ev.keyCode === 87){
        ev.preventDefault();
        //w
         bar_2.up();
     }else if(ev.keyCode === 83){
         //s
        bar_2.down(); 
     }
});
/*animación de la barras*/
window.requestAnimationFrame(controller);
/*Creamos un nuevo método que se llame PLAY*/
function controller(){
board_view.play();
window.requestAnimationFrame(controller);

}