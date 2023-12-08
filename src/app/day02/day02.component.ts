import {Component, OnInit} from '@angular/core';
import {finalize, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day02',
  templateUrl: './day02.component.html',
  styleUrl: './day02.component.css'
})
export class Day02Component implements OnInit {

  partOneMaxRed = 12;
  partOneMaxGreen = 13;
  partOneMaxBlue = 14;

  partOneTotal = 0;
  parTwoTotal = 0;

  partOneLinesOriginal: string[] = []
  partOneRoundsOriginal: any[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.readTextFilePartOne('assets/inputs/day02.txt').subscribe();
  }

  readTextFilePartOne(filePath: string): Observable<string[]> {
    return this.http.get(filePath, { responseType: 'text' })
      .pipe(
        map(content => content.split('\n')),
        tap(lines => lines.forEach(line => {
          this.partOneLinesOriginal.push(line);
          let gameId = this.getGameId(line) ?? 0;
          line = this.removeGameId(line);
          this.partOneRoundsOriginal.push(this.getRounds(line));

          let greenPossible = this.checkNumbers(this.getRounds(line), 'green', this.partOneMaxGreen);
          let redPossible = this.checkNumbers(this.getRounds(line), 'red', this.partOneMaxRed);
          let bluePossible = this.checkNumbers(this.getRounds(line), 'blue', this.partOneMaxBlue);

          let greenMax = this.getMinimumNumber(this.getRounds(line), 'green');
          let redMax = this.getMinimumNumber(this.getRounds(line), 'red');
          let blueMax = this.getMinimumNumber(this.getRounds(line), 'blue');

          if (
            greenPossible &&
            bluePossible &&
            redPossible
          ) {
            this.partOneTotal = this.partOneTotal + gameId
          }

          this.parTwoTotal = this.parTwoTotal + (greenMax * redMax * blueMax)



        })),
        finalize(() => {
          console.log(this.partOneTotal)
          console.log(this.parTwoTotal)
          }
        )
      );
  }

  getGameId(line: string) {
    let parts = line.split(':', 2);
    let match = parts[0].match(/\d+/);
    return match ? Number(match[0]) : null;
  }

  removeGameId(line: string) {
    let parts = line.split(':');
    if (parts.length > 1) {
      parts.shift();
    }
    return parts.join('').trim();
  }

  getRounds (line: string) {
    let rounds: string[] = line.split(';');
    return rounds
  }

  checkNumbers(rounds: string[], needle: string, max: number): boolean {
    for (let round of rounds) {
      let handfuls = round.split(',');
      for (let part of handfuls) {
        if (part.includes(needle)) {
          let match = part.match(/\d+/);
          if (match && (parseInt(match[0]) > max)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  getMinimumNumber(rounds: string[], needle:string): number {
    let currentMax = 0;
    for (let round of rounds) {
      let handfuls = round.split(',');
      for (let part of handfuls) {
        if (part.includes(needle)) {
          let match = part.match(/\d+/);
          if (match && (parseInt(match[0]) > currentMax)) {
           currentMax = parseInt(match[0]);
          }
        }
      }
    }
    return currentMax;
  }


}
