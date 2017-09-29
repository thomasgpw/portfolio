import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShutterComponent } from './shutter/shutter.component';
import { ContentComponent } from './content/content.component';
import { WelcomeComponent } from './shutter/welcome/welcome.component';
import { AboutComponent } from './shutter/about/about.component';
import { WorkWrapperComponent } from './content/work-wrapper/work-wrapper.component';

import { reducers, metaReducers } from './app.reducers';
import { AppState } from './app.datatypes';
import { GreetingService} from './_services/greeting.service';
import { RhymeService} from './_services/rhyme.service';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ShutterComponent,
        ContentComponent,
        WelcomeComponent,
        AboutComponent,
        WorkWrapperComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
