export interface Project{
    title: string;
    prev_desc: string;
    desc?: string;
    images?: string[];
    tech: string[];
    link?: string;
    company?: string;
    status: "ready" | "coming-soon",
}
