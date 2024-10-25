import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../environment/environment.config';
import { Environment } from '../../environment/environment.model';
import { LocalStorageService } from './localstorage.service';

@Injectable({providedIn: 'root'})
export class ThemeService {
    static isLight = false;

    init(): void {
        const saved = this.storage.getItem(this.environment.storage.theme);
        ThemeService.isLight = 'light' === saved;
        if (null !== saved) {
            this.update(saved);

            return;
        }

        let theme = 'light';
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark';
        }
        this.update(theme);
    }

    toggle(): void {
        ThemeService.isLight = !ThemeService.isLight;
        const theme = ThemeService.isLight ? 'light' : 'dark';
        this.update(theme);
    }

    update(theme: string): void {
        document.querySelector('html').setAttribute('data-theme', theme);
        this.storage.setItem(this.environment.storage.theme, theme);
    }

    constructor(
        private storage: LocalStorageService,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
    }
}
