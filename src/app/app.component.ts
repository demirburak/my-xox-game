import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  games: any[] = [];
  mark: string = "";
  moves: any = [];
  gameOver: boolean = false;
  message: string = "";

  constructor() {
    this.newGame();
  }

  newGame() {
    this.games = [];
    this.moves = [];
    for (let i = 0; i < 9; i++) {
      this.games.push({ mark: "", winner: false });
    }
    this.mark = "X";
    this.gameOver = false;
    this.message = `Next : ${this.mark}`;

  }


  setMark(index: number) {
    if (this.games[index].mark == "" && !this.gameOver) {
      this.games[index].mark = this.mark;
      
      const backedUpGames: any = [];
      this.games.forEach((e:any)=> backedUpGames.push(Object.assign({},e)));
      this.moves.push(backedUpGames);

      this.mark = (this.mark == "X") ? "O" : "X";
      this.message = "Next : " + this.mark;
      this.isGameOver();

    }
  }

  returnSelectedMove(index: number) {
    const restoredGames :any = [];
    this.moves[index].forEach((e:any) => restoredGames.push(Object.assign({},e)) );
    this.games = restoredGames;
  }

  isGameOver() {

    const possibleResults: any = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    possibleResults.forEach((e: any[]) => {
      if (this.games[e[0]].mark != "" &&
        this.games[e[0]].mark == this.games[e[1]].mark &&
        this.games[e[1]].mark == this.games[e[2]].mark) {
        this.gameOver = true;
        this.games[e[0]].winner =
          this.games[e[1]].winner =
          this.games[e[2]].winner = true;
          this.mark = this.games[e[0]].mark;
      }
    });

    if (this.gameOver) {
      this.message = "Game over. Winner is " + this.mark + ". :)";
    }

    const foundElements = this.games.filter((e) => e.mark == "");
    if (foundElements.length == 0 && !this.gameOver) {
      this.gameOver = true;
      this.message = "The game ended in a draw.";
    }
  }

}
