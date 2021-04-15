import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerlistComponent } from './pokerlist.component';

describe('PokerlistComponent', () => {
  let component: PokerlistComponent;
  let fixture: ComponentFixture<PokerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
