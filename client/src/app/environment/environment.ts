import { Environment } from './environment.model';

export const environment: Environment = {
    name: 'development',
    storage: {
        category: 'ECO_cat',
        count: {
            categories: 'ECO_cat_count',
            criteria: 'ECO_cri_count',
        },
        theme: 'ECO_theme',
    },
};
