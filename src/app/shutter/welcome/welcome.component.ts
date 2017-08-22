import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
@Output() goContent: EventEmitter<any> = new EventEmitter();
  clickContent() {
  	console.log("welcomeEmit")
  	this.goContent.emit("goContent");
  }
}
