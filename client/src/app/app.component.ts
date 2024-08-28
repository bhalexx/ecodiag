import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from './shared/services/localstorage.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private storage = inject(LocalStorageService);
    private themeStorageKey = 'ECO_theme';
    isLightTheme = false;

    ngOnInit(): void {
        const savedTheme = this.storage.getItem(this.themeStorageKey);
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

    toggleTheme(): void {
        this.isLightTheme = !this.isLightTheme;
        const theme = this.isLightTheme ? 'light' : 'dark';
        this.updateTheme(theme);
    }

    updateTheme(theme: string): void {
        document.querySelector('html').setAttribute('data-theme', theme);
        this.storage.setItem(this.themeStorageKey, theme);
    }
}
