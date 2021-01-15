import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit {
  private mediaSub: Subscription;
  deviceXs:boolean;
  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) {}
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        console.log(change);
        this.cdRef.markForCheck();
        this.deviceXs = change.mqAlias === 'xs' ? true : false;
      }
    );
  }

  ngAfterViewInit() {}
}
