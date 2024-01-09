import { Lesson } from "../models";
import axios from 'axios';

interface GetScheduleResult {
    lessons: Lesson[];
}

const apiUrl = import.meta.env.VITE_API_URL;
export const api = {
    async getSchedule(): Promise<Lesson[]> {
        const { data, status } = await axios.get<GetScheduleResult>(`${apiUrl}/schedule.json`);
        console.log('[api]', 'Fetch schedule result', status);
        return data.lessons;
    },
    async getThemes(): Promise<Record<string, string>> {
        const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/lessonThemes.json`);
        console.log('[api]', 'Fetch themes result', status);
        return data;
    },
    async getTypes(): Promise<Record<string, string>> {
        const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/lessonTypes.json`);
        console.log('[api]', 'Fetch types result', status);
        return data;
    },
    async getConnectionLinks(): Promise<Record<string, string>> {
        const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/connectionLinks.json`);
        console.log('[api]', 'Fetch connection links result', status);
        return data;
    },
    async getCheckoutLinks(): Promise<Record<string, string>> {
        const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/checkoutLinks.json`);
        console.log('[api]', 'Fetch checkout links result', status);
        return data;
    },
} as const;

