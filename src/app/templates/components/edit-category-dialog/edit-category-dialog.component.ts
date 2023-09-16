import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EditDialogDataModel} from '../../models/edit-dialog-data.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent {
  form: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogDataModel
  ) {
    this.form = this.formBuilder.group({
      name: [this.data?.category?.name ?? '', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const result = this.form.getRawValue();
    const name = result.name;
    const date = new Date();
    const updatedAt = date.toDateString();
    const status = this.data.status;
    if (this.data?.category?.id) {
      const newCategory = {...this.data.category, name, updatedAt, status};
      this.dialogRef.close(newCategory);
    } else {
      const createdAt = date.toDateString();
      const newCategory = { name, createdAt, updatedAt, status };
      this.dialogRef.close(newCategory);
    }
  }
}
