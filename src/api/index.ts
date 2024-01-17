import { TableInfo } from "../models";
import axios, { AxiosResponse } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const api = {
    async getSchedule(date: moment.Moment): Promise<TableInfo[]> {
        try {
            const fileName = date.clone().startOf('isoWeek').format("DD.MM.yyyy");
            const response: AxiosResponse<TableInfo[]> = await axios.get(`${apiUrl}/${fileName}.json`);
            const { data, status } = response;
            console.log('[api]', 'Fetch schedule result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return [];
        }
    },
    async getThemes(): Promise<Record<string, string>> {
        try {
            const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/lessonThemes.json`);
            console.log('[api]', 'Fetch themes result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return { "": "" };
        }
    },
    async getTypes(): Promise<Record<string, string>> {
        try {
            const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/lessonTypes.json`);
            console.log('[api]', 'Fetch types result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return { "": "" };
        }
    },
    async getConnectionLinks(): Promise<Record<string, string>> {
        try {
            const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/connectionLinks.json`);
            console.log('[api]', 'Fetch connection links result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return { "": "" };
        }
    },
    async getLessonToConnectionLinks(): Promise<Record<string, string>> {
        try {
            const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/lessonToConnectionLinks.json`);
            console.log('[api]', 'Fetch connection links result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return { "": "" };
        }
    },
    async getCheckoutLinks(): Promise<Record<string, string>> {
        try {
            const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/checkoutLinks.json`);
            console.log('[api]', 'Fetch checkout links result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return { "": "" };
        }
    },
    async getLessonToCheckoutLinks(): Promise<Record<string, string>> {
        try {
            const { data, status } = await axios.get<Record<string, string>>(`${apiUrl}/lessonToCheckoutLinks.json`);
            console.log('[api]', 'Fetch checkout links result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return { "": "" };
        }
    },
} as const;
