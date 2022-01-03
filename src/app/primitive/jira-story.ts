export interface JiraStory {
    description: string;
    summary: string;
    key: string;
    revealed: boolean;
    points?: string;
    note?: string;
    isNotePrivate: boolean;
    async: boolean;
    activePokerUsers: string[];
}
