import {Component, OnInit} from '@angular/core';
import {finalize, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day01',
  templateUrl: './day01.component.html',
  styleUrl: './day01.component.css'
})
export class Day01Component implements OnInit {

  partOneTotal = 0;
  partOneLinesOriginal: string[] = []
  partOneLinesStripped: string[] = []
  partOneLinesReady: string[] = []

  partTwoTotal = 0;
  partTwoLinesOriginal: string[] = []
  partTwoLinesParsed: string[] = []
  partTwoLinesStripped: string[] = []
  partTwoLinesReady: string[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.readTextFilePartOne('assets/inputs/day01.txt').subscribe();
    this.readTextFilePartTwo('assets/inputs/day01.txt').subscribe();
  }

  readTextFilePartOne(filePath: string): Observable<string[]> {
    return this.http.get(filePath, { responseType: 'text' })
      .pipe(
        map(content => content.split('\n')),
        tap(lines => lines.forEach(line => {
          this.partOneLinesOriginal.push(line);
          line = line.replace(/\D/g, '')
          this.partOneLinesStripped.push(line);
          if (line.length === 1) {
            this.partOneLinesReady.push(line.concat(line));
          } else {
            this.partOneLinesReady.push(line.charAt(0).concat(line.charAt(line.length - 1)));
          }
        })),
        finalize(() => {
          this.partOneLinesReady.forEach(line => {
            this.partOneTotal += Number(line);
          })
          console.log(this.partOneTotal);
          }
        )
      );
  }

  readTextFilePartTwo(filePath: string): Observable<string[]> {
    return this.http.get(filePath, { responseType: 'text' })
      .pipe(
        map(content => content.split('\n')),
        tap(lines => lines.forEach(line => {
          this.partTwoLinesOriginal.push(line);

          line = this.parseLines(line);
          this.partTwoLinesParsed.push(line);

          line = line.replace(/\D/g, '')
          this.partTwoLinesStripped.push(line);
          if (line.length === 1) {
            this.partTwoLinesReady.push(line.concat(line));
          } else {
            this.partTwoLinesReady.push(line.charAt(0).concat(line.charAt(line.length - 1)));
          }
        })),
        finalize(() => {
            // this.partOneTotal = this.partOneLinesReady.reduce((acc, val) => acc + Number(val), 0);
            this.partTwoLinesReady.forEach(line => {
              this.partTwoTotal += Number(line);
            })

            console.log(this.partTwoTotal);
          }
        )
      );
  }

  parseLines(line: string): string {
    const numberWords = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten"
    ];

    numberWords.forEach((word, index) => {
      const regex = new RegExp(word, "gi");
      line = line.replace(regex, `${word}${index}${word}`);
    });
    return line;
  }
}
