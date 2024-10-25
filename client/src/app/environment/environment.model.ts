import { EnvironmentName } from './environment-name.type';

export class Environment {
    name: EnvironmentName;
    storage: {
        category: string;
        count: {
            categories: string;
            criteria: string;
        };
        theme: string;
    };
}
