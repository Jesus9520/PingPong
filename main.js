
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
           //elements.push(this.ball);
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
       }
    }
    /* Funcion para recibir los parametros de las barras en x,y,ancho y alto y el dibujo de las barras*/
    function draw (ctx,element){  
       
           switch(element.kind){
             case "rectangle":
              ctx.fillRect(element.x,element.y,element.width,element.height);
              break;
             }  
       
       
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
        this.speed = 10;
             
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

var board = new Board(800,400);
var bar = new Bar(20,100,40,100, board);
var bar_2 = new Bar(735,100,40,100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);

/*creamos la clases*/



/* crear evento con el ketdown para que el jugador presiona teclas para jugar al PING PONG*/
document.addEventListener("keydown",function (ev){
    ev.preventDefault();
    if(ev.keyCode == 38){
        bar.up();
     }
     else if(ev.keyCode == 40){
         bar.down();
     }else if(ev.keyCode === 87){
        ev.preventDefault();
         bar_2.up();
     }else if(ev.keyCode === 83){
        bar_2.down(); 
     }
});
/*animación de la barras*/
window.requestAnimationFrame(controller);
/*intanciamos nuevos objetos de las clases*/
function controller(){
board_view.clean();
board_view.draw();
window.requestAnimationFrame(controller);

}