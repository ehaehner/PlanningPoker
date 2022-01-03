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
                // proxy image urls via backend
                this.userService.jiraPokerList.forEach(story => {
                    let descriptionHtmlObject = document.createElement('div');
                    descriptionHtmlObject.innerHTML = story.description.trim();
                    var imageTags = descriptionHtmlObject.getElementsByTagName('img');
                    for (var i = 0; i < imageTags.length; i++) {
                        if (imageTags[i].hasAttribute('src')) {
                            let imageSrc = imageTags[i].getAttribute('src');
                            if (imageSrc) {
                                let imageSrcUrl = new URL(imageSrc)
                                imageTags[i].setAttribute('src', '/jira-proxy' + imageSrcUrl.pathname);
                            } else {
                                console.log('Image src is null: ' + imageTags[i])
                            }
                        } else {
                            console.log('Image Tag has no src attribute: ' + imageTags[i]);
                        }
                    }
                    story.description = descriptionHtmlObject.innerHTML;
                });
                resolve(this.userService.jiraPokerList);
            });
        });
    }
}
