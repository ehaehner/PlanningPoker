export interface JiraStory {
    description: string;
    summary: string;
    key: string;
    revealed: boolean;
    points?: string;
    note?: string;
    async: boolean;
    activePokerUsers: string[];
}
