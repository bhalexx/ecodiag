# ECODIAG
A green project 🌱🌿 🫧🍃

## Installation
Clone the repo and run `make install`.

## Running
Run `make start` and wait for containers being started.
Then if database is empty, run `dce php server/bin/console d:m:m`. 

## Available commands
```
make start
make stop
make restart
make
```

## Faster process testing
In case of need, you can add this method to `client/src/app/categories/components/show/show.component.ts`:
```
forceCompletion(): void {
    this.criteriaValues.forEach((criterion: CriterionValue) => {
        criterion.status = CriterionStatus.COMPLIANT;
        this.form.controls['criterion_' + criterion.id].setValue(criterion.status);
    });
    this.saveChanges();
}
```
And this button in `client/src/app/categories/components/show/show.template.html`:
```
<button type="button" (click)="forceCompletion()">Compléter</button>
```
This will allow you to fully complete a category way faster.
