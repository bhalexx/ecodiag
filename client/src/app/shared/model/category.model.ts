import { Criterion } from './criterion.model';

export class Category {
    criteria: Array<Criterion>;
    description: string;
    icon: string;
    id: number;
    name: string;
    progression: number;
}
