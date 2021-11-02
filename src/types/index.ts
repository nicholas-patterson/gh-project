export type IData = {
    id: number;
    full_name: string;
    language: string;
    stargazers_count: number;
    description: string;
    owner: {
        login: string;
    }
}

export type SortConfig = 'asc' | 'desc' | null;