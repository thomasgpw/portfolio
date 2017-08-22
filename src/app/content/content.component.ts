import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
	@Output() goShutterEvent = new EventEmitter<any>();
	goShutterFunc() {
		this.goShutterEvent.emit(null);
	}
}
