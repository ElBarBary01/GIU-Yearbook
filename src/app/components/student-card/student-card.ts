/* =====================================================================
   FILE: components/student-card/student-card.ts
   WHAT: Logic for one reusable student card in the GIU Yearbook.
   WHY:  The parent page passes one Student through an input, while this
         component handles navigation and the missing-portrait fallback.
   ===================================================================== */
import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-card',
  imports: [RouterLink],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  // The parent page gives this component exactly one student to display.
  readonly student = input.required<Student>();

  // Remember whether the real portrait failed to load.
  private readonly imageFailed = signal(false);

  // Use the placeholder only after the real portrait reports an error.
  protected readonly photoSrc = computed(() =>
    this.imageFailed() ? 'images/placeholder-portrait.svg' : this.student().photo,
  );

  // Called by the template when the browser cannot load the portrait.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}
