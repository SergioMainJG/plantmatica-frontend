import { Pipe, PipeTransform } from '@angular/core';
import { GENDERS } from '../app/session/signup/signup';

@Pipe({
  name: 'translateGender',
})
export class TranslateGenderPipe implements PipeTransform {
  transform(gender: string): string {
    if (GENDERS.female === gender)
      return 'Femenino';

    if (GENDERS.male === gender)
      return 'Masculino';

    return 'Prefiero no revelarlo';
  }
}
