import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input('image') image: string;
  @Output('card') card = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {
  }

  cardClicked(value: string) {
    this.card.emit(value);
  }

}
