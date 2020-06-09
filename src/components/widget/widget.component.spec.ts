import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { marbles } from 'rxjs-marbles/jasmine';

import { WidgetComponent } from './widget.component';
import { PushPipe } from 'src/push.pipe';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetComponent, PushPipe],
      providers: [PushPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show number from observable', marbles((m) => {
    component.counter$ = m.cold('--a--', { a: 1 });
    m.flush();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const pTag = fixture.debugElement.query(By.css('p'));

      expect(pTag.nativeElement.textContent.trim()).toBe('widget works! 1');
    });
  }));
});
