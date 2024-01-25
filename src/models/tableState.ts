import { TableInfo } from "."
export interface TableState {
    connectionLinks: Record<string, string>,
    checkoutLinks: Record<string, string>,
    lessonThemes: Record<string, string>,
    lessonTypes: Record<string, string>,
    lessonToCheckoutLinks: Record<string, string>,
    lessonToConnectionLinks: Record<string, string>,
    lessonsList: TableInfo[]
}