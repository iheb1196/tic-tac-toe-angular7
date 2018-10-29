import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  currentMark = 'x';
  moves = 0;
  score = { x: 0, o: 0 };
  @ViewChild('win') modalWin;
  @ViewChild('tie') modalTie;

  marks = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  winner = '';
  public modalRef: BsModalRef; // {1}
  constructor(private modalService: BsModalService) { } // {2}
  ngOnInit() {
    // this.openModal(this.modalTemplate);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }

  displayMark() {
    return '<div class="x"></div>';
  }

  markclicked(i) {
    if (this.marks[i] === ' ') {
      this.moves++;
      this.marks[i] = this.currentMark;
      this.verifyWin(this.currentMark);
      this.currentMark = this.currentMark === 'x' ? 'o' : 'x';
    }
  }

  verifyWin(mark) {
    if (this.moves >= 5) {
      let marksHor = '';
      let iHor = 0;
      const winMark = mark + mark + mark;
      this.marks.forEach((markstr) => {
        marksHor += markstr;
        iHor++;
        if (iHor % Math.sqrt(this.marks.length) === 0) {
          marksHor += ' ';
        }
      });
      let marksVert = '';
      let iVert = 0;
      for (let i = 0; i < Math.sqrt(this.marks.length); i++) {
        for (let j = 0; j < Math.sqrt(this.marks.length); j++) {
          marksVert += this.marks[(j * Math.sqrt(this.marks.length) + i)];
          iVert++;
          if (iVert % Math.sqrt(this.marks.length) === 0) {
            marksVert += ' ';
          }
        }
      }
      let marksCross = '';
      for (let i = 0; i < Math.sqrt(this.marks.length); i++) {
        marksCross += this.marks[i * Math.sqrt(this.marks.length) + i];
      }
      let marksRevCross = '';
      for (let k = Math.sqrt(this.marks.length) * 2; k >= 2; k -= 2) {
        marksRevCross += this.marks[k];
      }
      if (marksVert.includes(winMark) || marksCross.includes(winMark) || marksRevCross.includes(winMark) || marksHor.includes(winMark)) {
        this.winner = mark;
        console.log(marksVert);
        this.score[mark] += 1;
        this.openModal(this.modalWin);
        setTimeout(() => { this.marks = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']; this.modalRef.hide(); this.moves = 0; }, 1600);
      } else if (this.moves === 9) {
        this.openModal(this.modalTie);
        setTimeout(() => { this.marks = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']; this.modalRef.hide(); this.moves = 0; }, 1600);

      }

    }
  }

}
