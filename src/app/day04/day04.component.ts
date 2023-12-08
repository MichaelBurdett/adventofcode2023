import {Component, OnInit} from '@angular/core';
import {finalize, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day04',
  templateUrl: './day04.component.html',
  styleUrl: './day04.component.css'
})
export class Day04Component implements OnInit {

  partOneTotal = 0;
  partTwoTotal = 0;
  processingPartOne = false;
  processingPartTwo = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.readTextFilePartOne('assets/inputs/day04.txt').subscribe();
  }

  readTextFilePartOne(filePath: string): Observable<string[]> {
    return this.http.get(filePath, { responseType: 'text' })
      .pipe(
        map(content => content.split('\n')),
        tap(lines => lines.forEach((line, $index) => {
          let gameId = this.getCardId(line) ?? 0;
          line = this.removeCardId(line);
          if (line.length > 1) {
            console.log(line);
            const winningNumbers = this.getWinningNumbers(line);
            console.log(winningNumbers);
            const entryNumbers  = this.getEntryNumbers(line);
            console.log(entryNumbers);
            const matchedNumbers = this.findMatchingNumbers(winningNumbers, entryNumbers);

            if (matchedNumbers.length > 0) {
              console.log('Matched: ' , matchedNumbers)
              console.log('Length: ' , matchedNumbers.length)
              console.log('Current Total: ', this.partOneTotal)
              console.log('Adding: ', this.calcPoints(matchedNumbers))
              this.partOneTotal = this.partOneTotal + this.calcPoints(matchedNumbers);
            } else {
              console.log('No matches');
            }


          }



        })),
        finalize(() => {
            console.log( this.partOneTotal);
          }
        )
      );
  }

  getCardId(line: string) {
    let parts = line.split(':', 2);
    let match = parts[0].match(/\d+/);
    return match ? Number(match[0]) : null;
  }

  removeCardId(line: string) {
    let parts = line.split(':');
    if (parts.length > 1) {
      parts.shift();
    }
    return parts.join('').trim();
  }

  getWinningNumbers(line: string) : number[] {
    let leftPart = line.split('|');
    let numbers = leftPart[0].split(' ');
    let winningNumbers = [];
    for (let num of numbers) {
      let match = num.match(/\d+/);
      if (match) {
        winningNumbers.push(Number(match[0]));
      }
    }
    return winningNumbers;
  }

  getEntryNumbers(line: string) : number[] {
    let leftPart = line.split('|');
    let numbers = leftPart[1].split(' ');
    let entryNumbers = [];
    for (let num of numbers) {
      let match = num.match(/\d+/);
      if (match) {
        entryNumbers.push(Number(match[0]));
      }
    }
    return entryNumbers;
  }

  findMatchingNumbers(winningNumbers: number[], entryNumbers: number[]): number[] {
     return entryNumbers.filter(number => winningNumbers.includes(number));
  }

  calcPoints(matchingNumbers: number[]) : number {
    switch (matchingNumbers.length) {
      default:
        return 0
      case 1:
        return 1
      case 2:
        return 2
      case 3:
        return 4
      case 4:
        return 8
      case 5:
        return 16
      case 6:
        return 32
      case 7:
        return 64
      case 8:
        return 128
      case 9:
        return 256
      case 10:
        return 512
    }
  }
}
