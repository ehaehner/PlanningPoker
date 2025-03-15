import { Component, OnInit } from '@angular/core';
import { JiraStory } from '../primitive/jira-story';
import { JiraService } from '../services/jira.service';

@Component({
    selector: 'app-pokerlist',
    templateUrl: './pokerlist.component.html',
    styleUrls: ['./pokerlist.component.scss'],
    standalone: false
})
export class PokerlistComponent implements OnInit {
    jiraPokerList: JiraStory[] = [];
    jiraPokerListLoading = true;

    constructor(private jiraService: JiraService) {
    }

    ngOnInit(): void {
        this.jiraService.getPokerList().then(list => {
            this.jiraPokerList = list;
            this.jiraPokerListLoading = false;
        });
    }
}

