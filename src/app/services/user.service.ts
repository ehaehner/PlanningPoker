import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { JiraStory } from '../primitive/jira-story';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { PokerResult } from '../primitive/poker-result';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    jiraPokerList: JiraStory[] = [];

    constructor(private cookieService: CookieService, private httpClient: HttpClient, private authService: AuthService) {
    }

    updateStoryAtServer(story: JiraStory): void {
        this.httpClient.post<any>(ConfigService.pokerConfig.apiBaseUrl + '/api/users/updateStory', {
            storyKey: story.key,
            note: story.note,
            storyPoints: story.points,
            username: this.authService.activeUser.value.username
        }, {observe: 'response'}).subscribe(() => {
        }, error => {
            switch (error.status) {
                case 201:
                    story.async = false;
                    console.log('story async');
                    break;
                default:
                    console.error(error);
            }
        });
    }

    getPokerResult(story: string): Observable<PokerResult[]> {
        return this.httpClient.post<PokerResult[]>(ConfigService.pokerConfig.apiBaseUrl + '/api/jira/pokerresults', {
            storyKey: story
        });
    }

    getAllUsers(): Observable<string[]> {
        return this.httpClient.get<string[]>(ConfigService.pokerConfig.apiBaseUrl + '/api/users/all');
    }

    createUser(newUsername: string): Observable<void> {
        return this.httpClient.post<void>(ConfigService.pokerConfig.apiBaseUrl + '/api/users/add', {
            username: newUsername
        });
    }
}
