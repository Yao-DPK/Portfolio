export interface Project{
    title: string;
    short: string;
    desc?: string;
    images?: string[];
    tech: string[];
    link?: string;
    company?: string;
    status: "ready" | "coming-soon",
}
