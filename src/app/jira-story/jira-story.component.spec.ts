import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraStoryComponent } from './jira-story.component';

describe('JiraStoryComponent', () => {
  let component: JiraStoryComponent;
  let fixture: ComponentFixture<JiraStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiraStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JiraStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
