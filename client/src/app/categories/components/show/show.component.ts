import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CriteriaStatusComponent } from '../../../shared/components/criteria-status.component';

@Component({
    templateUrl: './show.template.html',
    standalone: true,
    imports: [
        RouterLink,
        CriteriaStatusComponent,
        ReactiveFormsModule,
    ],
})
export class ShowComponent {
    // categories: Array<Category> = (categoriesData as any).default;
    // category: Category = null;
    // categoryCriteria: Array<Criteria> = [];
    // criterias: Array<{id: Array<Criteria>; value: number}> = (criteriasData as any).default;
    //
    // form: UntypedFormGroup;
    //
    // change(a): void {
    //     console.log(a);
    //     console.log(this.form.value);
    // }
    //
    // generateName(category: Category, index: any): string {
    //     return category.id + '.' + parseInt(index + 1, 10);
    // }
    //
    // ngOnInit(): void {
    //     super.ngOnInit();
    //     this.category = this.categories.filter((cat: Category) => parseInt(this.route.snapshot.params.id, 10) === cat.id)[0];
    //     this.categoryCriteria = this.criterias[0][this.category.id];
    // }
    //
    // onSubmit(): void {
    //     console.log(this.getFormData());
    // }
    //
    // protected createForm(): object {
    //     return {
    //         criterias: this.fb.control([]),
    //     };
    // }
    //
    // constructor(
    //     fb: FormBuilder,
    //     private route: ActivatedRoute,
    // ) {
    //     super(fb);
    // }
}
