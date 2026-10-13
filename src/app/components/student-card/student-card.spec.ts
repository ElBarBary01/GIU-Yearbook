import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Student } from '../../models/student.model';
import { StudentCard } from './student-card';

describe('StudentCard', () => {
  let fixture: ComponentFixture<StudentCard>;

  const student: Student = {
    id: 3,
    name: 'Farah Adel',
    faculty: 'Design',
    classYear: 2028,
    quote: "Make room for ideas that don't fit the brief.",
    photo: 'images/students/farah-adel.jpg',
    featured: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCard);
    fixture.componentRef.setInput('student', student);
    fixture.detectChanges();
  });

  it('renders the student data and story link', () => {
    const element = fixture.nativeElement as HTMLElement;
    const link = element.querySelector<HTMLAnchorElement>('a.card');
    const photo = element.querySelector<HTMLImageElement>('img.card__photo');

    expect(element.querySelector('.card__name')?.textContent).toContain(student.name);
    expect(element.querySelector('.card__meta')?.textContent).toContain('Design · Class of 2028');
    expect(element.querySelector('.card__quote')?.textContent).toContain(student.quote);
    expect(link?.getAttribute('href')).toBe('/students/3');
    expect(photo?.getAttribute('src')).toBe(student.photo);
  });

  it('switches to the placeholder when the portrait fails', () => {
    const photo = fixture.nativeElement.querySelector('img.card__photo') as HTMLImageElement;

    photo.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(photo.getAttribute('src')).toBe('images/placeholder-portrait.svg');
  });
});
