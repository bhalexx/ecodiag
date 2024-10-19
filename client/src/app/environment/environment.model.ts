import { EnvironmentName } from './environment-name.type';

export class Environment {
    name: EnvironmentName;
    storage: {
        categories: string;
        category: string;
    };
}
