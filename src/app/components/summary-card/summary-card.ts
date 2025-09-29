import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [NgClass],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css'
})
export class SummaryCard {
  @Input() title?: string
  @Input() value?: string
  @Input() bgColor?: string


}
