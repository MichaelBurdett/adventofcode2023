import {Component, OnInit} from '@angular/core';
import {finalize, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day03',
  templateUrl: './day03.component.html',
  styleUrl: './day03.component.css'
})
export class Day03Component implements OnInit {

  partOneTotal = 0;
  partTwoTotal = 0;
  processingPartOne = false;
  processingPartTwo = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.readTextFilePartOne('assets/inputs/day03-matt.txt').subscribe();
  }

  readTextFilePartOne(filePath: string): Observable<string[]> {
    return this.http.get(filePath, { responseType: 'text' })
      .pipe(
        map(content => content.split('\n')),
        tap(lines => lines.forEach((line, $index) => {
          // console.log(lines)
          let prevRow = lines[$index - 1] ?? '';
          let nextRow = lines[$index + 1] ?? '';
          console.log('Checking Line: ' , $index +1)

          let hasSymbol = this.checkForSymbol(line);
          let symbolPositions = this.findSymbolPositions(line);
          console.log(symbolPositions)
          if (hasSymbol && this.processingPartOne) {
            symbolPositions.forEach(symbolPosition => {

              let aboveRowBackTwo = prevRow[symbolPosition -2] ?? '';
              let aboveRowBackOne = prevRow[symbolPosition -1] ?? '';
              let aboveRowMiddle = prevRow[symbolPosition] ?? '';
              let aboveRowFrontOne = prevRow[symbolPosition +1] ?? '';
              let aboveRowFrontTwo = prevRow[symbolPosition +2] ?? '';

              let centerRowBackOne = line[symbolPosition -1] ?? '';
              let centerRowMiddle = line[symbolPosition] ?? '';
              let centerRowFrontOne = line[symbolPosition +1] ?? '';

              let belowRowBackTwo = nextRow[symbolPosition -2] ?? '';
              let belowRowBackOne = nextRow[symbolPosition -1] ?? '';
              let belowRowMiddle = nextRow[symbolPosition] ?? '';
              let belowRowFrontOne = nextRow[symbolPosition +1] ?? '';
              let belowRowFrontTwo = nextRow[symbolPosition +2] ?? '';

              // Check top left
              if (this.isNumber(aboveRowBackOne) && (!this.isNumber(aboveRowMiddle))) {
                console.log('Found: ' , this.getFullNumber(prevRow, symbolPosition -1, 'backwards'))
                this.partOneTotal = this.partOneTotal + this.getFullNumber(prevRow, symbolPosition -1, 'backwards');
              }

              // Check top middle
              if (this.isNumber(aboveRowMiddle)) {
                // xxN..
                // ..*..
                // .....
                if (this.isNumber(aboveRowBackOne) && (!this.isNumber(aboveRowFrontOne))) {
                  console.log('Found: ' , this.getFullNumber(prevRow, symbolPosition, 'backwards'))
                  this.partOneTotal = this.partOneTotal + this.getFullNumber(prevRow, symbolPosition, 'backwards');
                }

                // .xNx.
                // ..*..
                // .....
                if (this.isNumber(aboveRowBackOne) && (this.isNumber(aboveRowFrontOne))) {
                  console.log(this.getFullNumber(prevRow, symbolPosition +1, 'backwards'))
                  this.partOneTotal = this.partOneTotal + this.getFullNumber(prevRow, symbolPosition +1, 'backwards');
                }

                // ..Nxx
                // ..*..
                // .....
                if (!this.isNumber(aboveRowBackOne) && (this.isNumber(aboveRowFrontOne))) {
                  console.log(this.getFullNumber(prevRow, symbolPosition, 'forwards'))
                  this.partOneTotal = this.partOneTotal + this.getFullNumber(prevRow, symbolPosition, 'forwards');
                }
                // ..N..
                // ..*..
                // .....
                if (!this.isNumber(aboveRowBackOne) && (!this.isNumber(aboveRowFrontOne))) {
                  console.log(parseInt(aboveRowMiddle));
                  this.partOneTotal = this.partOneTotal + parseInt(aboveRowMiddle);
                }
              }

              // Check top right
              if (this.isNumber(aboveRowFrontOne) && (!this.isNumber(aboveRowMiddle))) {
                console.log(this.getFullNumber(prevRow, symbolPosition +1, 'forwards'))
                this.partOneTotal = this.partOneTotal + this.getFullNumber(prevRow, symbolPosition +1, 'forwards');
              }

              // Check left
              if (this.isNumber(centerRowBackOne)) {
                console.log(this.getFullNumber(line, symbolPosition -1, 'backwards'))
                this.partOneTotal = this.partOneTotal + this.getFullNumber(line, symbolPosition -1, 'backwards');
              }

              // Check right
              if (this.isNumber(centerRowFrontOne)) {
                console.log(this.getFullNumber(line, symbolPosition +1, 'forwards'))
                this.partOneTotal = this.partOneTotal + this.getFullNumber(line, symbolPosition +1, 'forwards');
              }

              // Check bottom left
              if (this.isNumber(belowRowBackOne) && (!this.isNumber(belowRowMiddle))) {
                console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition -1, 'backwards'))
                this.partOneTotal = this.partOneTotal + this.getFullNumber(nextRow, symbolPosition -1, 'backwards');
              }

              // Check bottom middle
              if (this.isNumber(belowRowMiddle)) {
                // .....
                // ..*..
                // xxN..
                if (this.isNumber(belowRowBackOne) && (!this.isNumber(belowRowFrontOne))) {
                  console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition, 'backwards'))
                  this.partOneTotal = this.partOneTotal + this.getFullNumber(nextRow, symbolPosition, 'backwards');
                }

                // .....
                // ..*..
                // .xNx.
                if (this.isNumber(belowRowBackOne) && (this.isNumber(belowRowFrontOne))) {
                  console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition +1, 'backwards'))
                  this.partOneTotal = this.partOneTotal + this.getFullNumber(nextRow, symbolPosition +1, 'backwards');
                }

                // .....
                // ..*..
                // ..Nxx
                if (!this.isNumber(belowRowBackOne) && (this.isNumber(belowRowFrontOne))) {
                  console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition, 'forwards'))
                  this.partOneTotal = this.partOneTotal + this.getFullNumber(nextRow, symbolPosition, 'forwards');
                }
                // .....
                // ..*..
                // ..N..
                if (!this.isNumber(belowRowBackOne) && (!this.isNumber(belowRowFrontOne))) {
                  console.log('Found: ' , parseInt(belowRowMiddle));
                  this.partOneTotal = this.partOneTotal + parseInt(belowRowMiddle);
                }
              }

              // Check bottom right
              if (this.isNumber(belowRowFrontOne) && (!this.isNumber(belowRowMiddle))) {
                console.log(this.getFullNumber(nextRow, symbolPosition +1, 'forwards'))
                this.partOneTotal = this.partOneTotal + this.getFullNumber(nextRow, symbolPosition +1, 'forwards');
              }

              console.log(aboveRowBackTwo, aboveRowBackOne, aboveRowMiddle, aboveRowFrontOne, aboveRowFrontTwo)
              console.log(line[symbolPosition -2], line[symbolPosition -1], line[symbolPosition], line[symbolPosition +1], line[symbolPosition +2])
              console.log(belowRowBackTwo, belowRowBackOne, belowRowMiddle, belowRowFrontOne, belowRowFrontTwo)
              console.log('------------------------')

            })
          }

          if (hasSymbol && this.processingPartTwo) {
            symbolPositions.forEach(symbolPosition => {
              if (line[symbolPosition] === '*') {

                let valueOne: number | undefined;
                let valueTwo: number | undefined;

                let aboveRowBackTwo = prevRow[symbolPosition -2] ?? '';
                let aboveRowBackOne = prevRow[symbolPosition -1] ?? '';
                let aboveRowMiddle = prevRow[symbolPosition] ?? '';
                let aboveRowFrontOne = prevRow[symbolPosition +1] ?? '';
                let aboveRowFrontTwo = prevRow[symbolPosition +2] ?? '';

                let centerRowBackOne = line[symbolPosition -1] ?? '';
                let centerRowMiddle = line[symbolPosition] ?? '';
                let centerRowFrontOne = line[symbolPosition +1] ?? '';

                let belowRowBackTwo = nextRow[symbolPosition -2] ?? '';
                let belowRowBackOne = nextRow[symbolPosition -1] ?? '';
                let belowRowMiddle = nextRow[symbolPosition] ?? '';
                let belowRowFrontOne = nextRow[symbolPosition +1] ?? '';
                let belowRowFrontTwo = nextRow[symbolPosition +2] ?? '';

                // Check top left
                if (this.isNumber(aboveRowBackOne) && (!this.isNumber(aboveRowMiddle))) {
                  console.log('Found: ' , this.getFullNumber(prevRow, symbolPosition -1, 'backwards'))
                  const tmpValue = this.getFullNumber(prevRow, symbolPosition -1, 'backwards');
                  if (!valueOne) {
                    valueOne = tmpValue
                  } else {
                    valueTwo = tmpValue
                  }
                }

                // Check top middle
                if (this.isNumber(aboveRowMiddle)) {
                  // xxN..
                  // ..*..
                  // .....
                  if (this.isNumber(aboveRowBackOne) && (!this.isNumber(aboveRowFrontOne))) {
                    console.log('Found: ' , this.getFullNumber(prevRow, symbolPosition, 'backwards'))
                    const tmpValue = this.getFullNumber(prevRow, symbolPosition, 'backwards');
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }

                  // .xNx.
                  // ..*..
                  // .....
                  if (this.isNumber(aboveRowBackOne) && (this.isNumber(aboveRowFrontOne))) {
                    console.log(this.getFullNumber(prevRow, symbolPosition +1, 'backwards'))
                    const tmpValue = this.getFullNumber(prevRow, symbolPosition +1, 'backwards');
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }

                  // ..Nxx
                  // ..*..
                  // .....
                  if (!this.isNumber(aboveRowBackOne) && (this.isNumber(aboveRowFrontOne))) {
                    console.log(this.getFullNumber(prevRow, symbolPosition, 'forwards'))
                    const tmpValue = this.getFullNumber(prevRow, symbolPosition, 'forwards');
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }
                  // ..N..
                  // ..*..
                  // .....
                  if (!this.isNumber(aboveRowBackOne) && (!this.isNumber(aboveRowFrontOne))) {
                    console.log(parseInt(aboveRowMiddle));
                    const tmpValue = parseInt(aboveRowMiddle);
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }
                }

                // Check top right
                if (this.isNumber(aboveRowFrontOne) && (!this.isNumber(aboveRowMiddle))) {
                  console.log(this.getFullNumber(prevRow, symbolPosition +1, 'forwards'))
                  const tmpValue = this.getFullNumber(prevRow, symbolPosition +1, 'forwards');
                  if (!valueOne) {
                    valueOne = tmpValue
                  } else {
                    valueTwo = tmpValue
                  }
                }

                // Check left
                if (this.isNumber(centerRowBackOne)) {
                  console.log(this.getFullNumber(line, symbolPosition -1, 'backwards'))
                  const tmpValue = this.getFullNumber(line, symbolPosition -1, 'backwards');
                  if (!valueOne) {
                    valueOne = tmpValue
                  } else {
                    valueTwo = tmpValue
                  }
                }

                // Check right
                if (this.isNumber(centerRowFrontOne)) {
                  console.log(this.getFullNumber(line, symbolPosition +1, 'forwards'))
                  const tmpValue = this.getFullNumber(line, symbolPosition +1, 'forwards');
                  if (!valueOne) {
                    valueOne = tmpValue
                  } else {
                    valueTwo = tmpValue
                  }
                }

                // Check bottom left
                if (this.isNumber(belowRowBackOne) && (!this.isNumber(belowRowMiddle))) {
                  console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition -1, 'backwards'))
                  const tmpValue = this.getFullNumber(nextRow, symbolPosition -1, 'backwards');
                  if (!valueOne) {
                    valueOne = tmpValue
                  } else {
                    valueTwo = tmpValue
                  }
                }

                // Check bottom middle
                if (this.isNumber(belowRowMiddle)) {
                  // .....
                  // ..*..
                  // xxN..
                  if (this.isNumber(belowRowBackOne) && (!this.isNumber(belowRowFrontOne))) {
                    console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition, 'backwards'))
                    const tmpValue = this.getFullNumber(nextRow, symbolPosition, 'backwards');
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }

                  // .....
                  // ..*..
                  // .xNx.
                  if (this.isNumber(belowRowBackOne) && (this.isNumber(belowRowFrontOne))) {
                    console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition +1, 'backwards'))
                    const tmpValue = this.getFullNumber(nextRow, symbolPosition +1, 'backwards');
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }

                  // .....
                  // ..*..
                  // ..Nxx
                  if (!this.isNumber(belowRowBackOne) && (this.isNumber(belowRowFrontOne))) {
                    console.log('Found: ' , this.getFullNumber(nextRow, symbolPosition, 'forwards'))
                    const tmpValue = this.getFullNumber(nextRow, symbolPosition, 'forwards');
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }
                  // .....
                  // ..*..
                  // ..N..
                  if (!this.isNumber(belowRowBackOne) && (!this.isNumber(belowRowFrontOne))) {
                    console.log('Found: ' , parseInt(belowRowMiddle));
                    const tmpValue = parseInt(belowRowMiddle);
                    if (!valueOne) {
                      valueOne = tmpValue
                    } else {
                      valueTwo = tmpValue
                    }
                  }
                }

                // Check bottom right
                if (this.isNumber(belowRowFrontOne) && (!this.isNumber(belowRowMiddle))) {
                  console.log(this.getFullNumber(nextRow, symbolPosition +1, 'forwards'))
                  const tmpValue = this.getFullNumber(nextRow, symbolPosition +1, 'forwards');
                  if (!valueOne) {
                    valueOne = tmpValue
                  } else {
                    valueTwo = tmpValue
                  }
                }

                if (valueOne && valueTwo) {
                  this.partTwoTotal = this.partTwoTotal + (valueOne * valueTwo)
                }


              }


              console.log('------------------------')

            })
          }
          // console.log($index, ' : ', hasSymbol, ':', line)

        })),
        finalize(() => {
          console.warn('END')
          // console.warn(this.partOneTotal)
          console.warn(this.partTwoTotal)
          }
        )
      );
  }

  isNumber(char: string): boolean {
    return !isNaN(parseInt(char));
  }


  checkForSymbol(line: string): boolean {
    return /[^a-zA-Z0-9_. ]/.test(line);
  }

  findSymbolPositions(input: string): number[] {
    const symbolPositions = [];
    const allowedCharacters = /^[a-zA-Z0-9. ]$/;

    for(let i = 0; i < input.length; i++) {
      if(!allowedCharacters.test(input[i])) {
        symbolPositions.push(i);
      }
    }

    return symbolPositions;
  }

  getFullNumber(line: string, startPosition: number, direction: 'forwards' | 'backwards'): number {
    let position = startPosition;
    let result = '';

    while (position >= 0 && position < line.length) {
      const char = line[position];

      if (!/^[0-9]$/.test(char)) {
        break;
      }

      result = direction === 'forwards' ? result + char : char + result;
      position += direction === 'forwards' ? 1 : -1;
    }

    return parseInt(result);
  }

}
