import { JiraStory } from './jira-story';

export interface UserProfile {
    username: string;
    stories: JiraStory[];
}
