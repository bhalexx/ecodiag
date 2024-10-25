import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ENVIRONMENT } from './environment/environment.config';
import { Environment } from './environment/environment.model';
import { CounterService } from './shared/services/counter.service';
import { LocalStorageService } from './shared/services/localstorage.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    isLightTheme = false;

    initTheme(): void {
        const savedTheme = this.storage.getItem(this.environment.storage.theme);
        this.isLightTheme = 'light' === savedTheme;
        if (null !== savedTheme) {
            this.updateTheme(savedTheme);

            return;
        }

        let theme = 'light';
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark';
        }
        this.updateTheme(theme);
    }

    ngOnInit(): void {
        this.initTheme();
        combineLatest([
            this.counter.categories(),
            this.counter.criteria(),
        ]).subscribe(
            ([categories, criteria]) => {
                this.storage.setItem(this.environment.storage.count.categories, JSON.stringify(categories));
                this.storage.setItem(this.environment.storage.count.criteria, JSON.stringify(criteria));
            },
        );
    }

    toggleTheme(): void {
        this.isLightTheme = !this.isLightTheme;
        const theme = this.isLightTheme ? 'light' : 'dark';
        this.updateTheme(theme);
    }

    updateTheme(theme: string): void {
        document.querySelector('html').setAttribute('data-theme', theme);
        this.storage.setItem(this.environment.storage.theme, theme);
    }

    constructor(
        private storage: LocalStorageService,
        private counter: CounterService,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
    }
}
