import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWrapperComponent } from './work-wrapper.component';

describe('WorkWrapperComponent', () => {
  let component: WorkWrapperComponent;
  let fixture: ComponentFixture<WorkWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkWrapperComponent);
    component = fixture.componentInstance;
    component.work = {active: false, w: 600, h: 600, canvas: new Canvas};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
