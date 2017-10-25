import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CookieOptionsProvider } from '../../../node_modules/ngx-cookie/src/cookie-options-provider';
import { WorkState } from '../content/_works/work-state.datatype';
import { ImmediateEllipseData, PointsToPointData, EllipseSet, Point, ColorPoint } from '../content/_works/work.datatypes';
import { AppState, IterableStringInstance } from '../app.datatypes';

@Injectable()
export class CustomCookieService extends CookieService {
  constructor(private _cookieOptionsProvider: CookieOptionsProvider) {
    super(_cookieOptionsProvider);
  }
  getAppStateCookie(): AppState {
    const cookieString = this.pullCookieString();
    if (cookieString)  {
      console.log('getAppStateCookie', cookieString);
      return this.cookieStringToAppState(cookieString);
    } else {
      return null;
    }
  }
  pullCookieString(): string {
    return this.get('thomasgdotpwAppState');
  }
  // changeAppViewValue(value: boolean): void {
  //   this.editCookieString(value.toString(), 0);
  // }
  // changeShutterViewValue(value: boolean): void {
  //   this.editCookieString(value.toString(), 1);
  // }
  // changeColorValue(value: string): void {
  //   this.editCookieString(value, 2);
  // }
  // changeWorkActiveValue(value: number): void {
  //   this.editCookieString(value ? value.toString() : 'null', 3);
  // }
  // editCookieString(value: string, position: number): void {
  //   const cookieArray = this.cookieString.split('!');
  //   cookieArray[position] = value;
  //   /* DOES NOTHING */
  // }
  setAppStateCookie(appState: AppState): void {
    this.putCookieString(this.appStateToCookieString(appState));
  }
  putCookieString(cookieString: string): void {
    console.log('putCookieString', cookieString);
    this.put(
      'thomasgdotpwAppState',
      cookieString,
      {
        path: '/',
        // domain: 'localhost',
        expires: new Date(Date.now() + 2.419e+9)
      }
    );
  }
  workStateToString(workState: WorkState): string {
    const type = workState.type;
    switch (type) {
      case 'ImmediateEllipse':
        return type + '$' + this.immediateEllipseDataToString(workState.workData as ImmediateEllipseData);
      case 'PointsToPoint':
        return type + '$' + this.pointsToPointDataToString(workState.workData as PointsToPointData);
      default:
        return null;
    }
  }
  immediateEllipseDataToString(workData: ImmediateEllipseData): string {
    let workString = '[';
    if (workData.length > 0) {
      for (const ellipseSet of workData) {
        workString += ellipseSet.center.toString() + '%';
        for (const point of ellipseSet.points) {
          workString += point.toString() + '%';
        }
        workString = workString.slice(0, workString.length - 1) + ']$[';
      }
      workString = workString.slice(0, workString.length - 2);
    }
    return workString + ']';
  }
  pointsToPointDataToString(workData: PointsToPointData): string {
    let workString = '[';
    const centerPoints = workData.centerPoints;
    const points = workData.points;
    if (centerPoints.length > 0) {
      for (const centerPoint of centerPoints) {
        workString += centerPoint.toString() + '%';
      }
      workString = workString.slice(0, workString.length - 1);
    }
    workString += ']$[';
    if (points.length > 0) {
      for (const point of points) {
        workString += point.toString() + '%';
      }
      workString = workString.slice(0, workString.length - 1);
    }
    return workString + ']';
  }
  appStateToCookieString(appState: AppState): string {
    const appView = appState.appView;
    const shutterView = appState.shutterView;
    const workActive = appState.workActive;
    const workActiveString = (workActive !== null) ? workActive.toString() : 'null';
    let cookie
    = appView.view0Alive.toString() + '!'
    + shutterView.view0Alive.toString() + '!'
    + appState.color.toString() + '!'
    + workActiveString + '!'
    ;
    // console.log(appState.workStates);
    for (const workState of appState.workStates) {
      cookie += this.workStateToString(workState) + '@';
    }
    return cookie.slice(0, cookie.length - 1);
  }
  stringToWorkState(workStateString: string): WorkState {
    const workStateData = workStateString.split('$');
    const type = workStateData.shift();
    switch (type) {
      case 'ImmediateEllipse':
        return {
          workData: this.stringToImmediateEllipseData(workStateData),
          type: type
        };
      case 'PointsToPoint':
        return {
          workData: this.stringToPointsToPointData(workStateData),
          type: type
        };
      default:
        return null;
    }
  }
  stringToImmediateEllipseData(workDataStrings: string[]): ImmediateEllipseData {
    const immediateEllipseData: ImmediateEllipseData = [];
    for (let ellipseSetString of workDataStrings) {
      ellipseSetString = ellipseSetString.slice(1, ellipseSetString.length - 1);
      if (ellipseSetString) {
        const ellipseSetData = ellipseSetString.split('%');
        const ellipseSet = new EllipseSet(this.stringToPoint(ellipseSetData.shift()));
        const points = ellipseSet.points;
        for (const pointString of ellipseSetData) {
          // console.log(pointString);
          points.push(this.stringToPoint(pointString));
        }
        immediateEllipseData.push(ellipseSet);
      }
    }
    return immediateEllipseData;
  }
  stringToPointsToPointData(workDataStrings: string[]): PointsToPointData {
    const pointsToPointData: PointsToPointData = {
      centerPoints: [],
      points: []
    };
    const centerPoints = pointsToPointData.centerPoints;
    const points = pointsToPointData.points;
    // console.log('workDataStrings', workDataStrings);
    let centerPointsString = workDataStrings[0];
    centerPointsString = centerPointsString.slice(1, centerPointsString.length - 1);
    if (centerPointsString) {
      const centerPointStrings = centerPointsString.split('%');
      for (const centerPointString of centerPointStrings) {
        centerPoints.push(this.stringToColorPoint(centerPointString));
      }
    }
    let pointsString = workDataStrings[1];
    pointsString = pointsString.slice(1, pointsString.length - 1);
    if (pointsString) {
      const pointStrings = pointsString.split('%');
      for (const pointString of pointStrings) {
        // console.log('pointsString', pointsString);
        // console.log('pointStrings', pointStrings);
        // console.log('pointString', pointString);
        points.push(this.stringToPoint(pointString));
      }
    }
    return pointsToPointData;
  }
  stringToPoint(pointString: string): Point {
    const pointData = pointString.split('|');
    return new Point(parseFloat(pointData[0]), parseFloat(pointData[1]));
  }
  stringToColorPoint(pointString: string): ColorPoint {
    const pointData = pointString.split('|');
    return new ColorPoint(parseFloat(pointData[0]), parseFloat(pointData[1]), pointData[2]);
  }
  cookieStringToAppState(cookieString: string): AppState {
    const appStateData = cookieString.split('!');
    const appView0Alive = (appStateData[0] === 'true');
    const shutterView0Alive = (appStateData[1] === 'true');
    const workStatesData: Array<WorkState> = [];
    const workActiveString = appStateData[3];
    const workActive = workActiveString === 'null' ? null : parseInt(workActiveString, 10);
    for (const workStateString of appStateData[4].split('@')) {
      workStatesData.push(this.stringToWorkState(workStateString));
    }
    return {
      appView: {
        view0Alive: appView0Alive,
        view1Alive: !appView0Alive,
        animationState: appView0Alive,
        transitionActive: false
      },
      shutterView: {
        view0Alive: shutterView0Alive,
        view1Alive: !shutterView0Alive,
        animationState: shutterView0Alive,
        transitionActive: false
      },
      texts: {
        greeting: null,
        name: null,
        tip: null,
        rhyme: null
      },
      color: parseInt(appStateData[2], 10),
      unitLength: null,
      isPortrait: null,
      workActive: workActive,
      workStates: workStatesData
    };
  }
}
