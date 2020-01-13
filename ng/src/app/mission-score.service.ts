import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionScoreService {
  $level = new ReplaySubject<number>();

  level = 0;
  time = 0;
  steps = 0;
  answer = 0;

  constructor() { }
}
