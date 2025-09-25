import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
title = signal('my app')

label = input('');

clickButton() {
  console.log('Button clicked!');
  // this.label.set('Button Clicked!');
}
}
