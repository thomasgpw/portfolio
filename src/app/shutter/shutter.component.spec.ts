import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeModule } from './welcome/welcome.module';
import { AboutModule } from './about/about.module';
import { ShutterComponent } from './shutter.component';

describe('ShutterComponent', () => {
  let component: ShutterComponent;
  let fixture: ComponentFixture<ShutterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        WelcomeModule,
        AboutModule
      ],
      declarations: [ ShutterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShutterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
