import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-category-actions',
  templateUrl: './category-actions.component.html',
  styleUrls: ['./category-actions.component.scss']
})
export class CategoryActionsComponent {

  @Output()
  edit: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  archive: EventEmitter<void> = new EventEmitter<void>();

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit();
  }

  onArchive(event: Event) {
    event.stopPropagation();
    this.archive.emit();
  }
}
