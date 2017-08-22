import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @Output() goContent = new EventEmitter<any>();
  clickContent() {
  	console.log("aboutEmit")
  	this.goContent.emit(null);
  }
}
