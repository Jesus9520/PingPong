
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

    
    self.BoardView.prototype = {
    draw : function (){
        for (var i = this.board.elements.length - 1; i >= 0; i--) {
            var el = this.board.elements[i];
            draw(this.ctx, el);                
          };
       }
    }
    /* Funcion para recibir los parametros de las barras en x,y,ancho y alto y el dibujo de las barras*/
    function draw (ctx,element){  
        if(element !== null && element.hasOwnProperty("kind")){
           switch(element.kind){
             case "rectangle":
              ctx.fillRect(element.x,element.y,element.width,element.height);
              break;
             }  
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
             
    }
    /* Función para moviemiento de las barras*/
    self.Bar.prototype = {
        down: function () {   
                   
        },
        up: function () {  
                   
        }
       
    }
})();

window.addEventListener("load", main);
/*intanciamos nuevos objetos de las clases*/
function main(){
    var board = new Board(800,400);
    var bar = new Bar(20,100,40,100, board);
    var bar2 = new Bar(735,100,40,100, board);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);


    board_view.draw();

}