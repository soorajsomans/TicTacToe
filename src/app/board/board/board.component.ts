import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[]=[];
  xIsNext: boolean=false;
  winner: string ='';
  in:any;
  moves:number = 0;
  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
    this.newGame();
  }
  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext =true;
    this.moves = 0;
  }

  get player(){
    return this.xIsNext ? 'X' : 'O' ;
  }

  makeMove(idx: number,dialog: TemplateRef<any>){
    if(!this.squares[idx] && this.winner ==null || this.winner==''){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.moves +=1;
    }
    //this.calculateWinner();
    this.winner = this.calculateWinner();
    if(this.winner !=null){
      
      this.open(dialog,`Player ${this.winner} won!`)
      
    }
    if(this.moves == 9 && this.winner == null){
      this.open(dialog,`Match tied.`)
    }
  }

  calculateWinner(){
     const lines =[
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
     ];
     for(let i=0;i<lines.length;i++){
       const [a, b, c] = lines[i];
       if(
         this.squares[a] && this.squares[a] === this.squares[b] &&
         this.squares[a] === this.squares[c]
       ){
         return this.squares[a];
         
              }
     }

     return null;
  }
  
  open(dialog: TemplateRef<any>, msg:string) {
    this.dialogService.open(dialog, { context: msg });
  }
}
