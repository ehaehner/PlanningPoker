import { Injectable } from '@angular/core';
import { JiraStory } from '../primitive/jira-story';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class JiraService {

    constructor(private userService: UserService, private httpClient: HttpClient) {
    }

    getPokerList(): Promise<JiraStory[]> {
        return new Promise<JiraStory[]>(resolve => {
            this.httpClient.get<JiraStory[]>(ConfigService.pokerConfig.apiBaseUrl + '/api/jira/pokerlist').subscribe((data) => {
                this.userService.jiraPokerList = data;
                resolve(this.userService.jiraPokerList);
            });
        });
    }
}
