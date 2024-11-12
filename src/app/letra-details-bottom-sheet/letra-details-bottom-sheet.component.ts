import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-letra-details-bottom-sheet',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './letra-details-bottom-sheet.component.html',
  styleUrls: ['./letra-details-bottom-sheet.component.css']
})
export class LetraDetailsBottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
}