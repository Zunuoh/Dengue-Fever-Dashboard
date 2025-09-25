import { Type } from "@angular/core";

export interface Widget {
    id: number;
    label: string;
    value: string;
    content: Type<unknown>;
}