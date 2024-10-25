import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ENVIRONMENT } from './environment/environment.config';
import { Environment } from './environment/environment.model';
import { CounterService } from './shared/services/counter.service';
import { LocalStorageService } from './shared/services/localstorage.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    isLightTheme(): boolean {
        return ThemeService.isLight;
    }

    ngOnInit(): void {
        this.theme.init();
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
        this.theme.toggle();
    }

    constructor(
        private storage: LocalStorageService,
        private counter: CounterService,
        public theme: ThemeService,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
    }
}
