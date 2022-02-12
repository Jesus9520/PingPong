
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
})();

window.addEventListener("load", main);
/*intanciamos nuevos objetos de las clases*/
function main(){
    var board = new Board(800,400);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);

}