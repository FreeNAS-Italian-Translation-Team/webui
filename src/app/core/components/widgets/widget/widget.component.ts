import { Component, AfterViewInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreServiceInjector } from 'app/core/services/coreserviceinjector';
import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { ThemeService } from 'app/services/theme/theme.service';
import { MaterialModule } from 'app/appMaterial.module';
import { iXObject } from 'app/core/classes/ix-object';
import { ChartData } from 'app/core/components/viewchart/viewchart.component';
import { ViewChartDonutComponent } from 'app/core/components/viewchartdonut/viewchartdonut.component';
import { ViewChartPieComponent } from 'app/core/components/viewchartpie/viewchartpie.component';
import { ViewChartLineComponent } from 'app/core/components/viewchartline/viewchartline.component';

import filesize from 'filesize';

import { TranslateService } from '@ngx-translate/core';

import { T } from '../../../../translate-marker';

@Component({
  selector: 'widget',
  templateUrl:'./widget.component.html'
})
export class WidgetComponent extends iXObject implements AfterViewInit, OnChanges {

  protected core:CoreService;
  protected themeService: ThemeService;
  @Input() widgetSize: string;
  @Input() isCompact?: boolean = false;
  @Input() rendered?:boolean = true;
  @Input() configurable:boolean = false;
  @Output() back = new EventEmitter();
  public title:string = T("Widget Base Class");
  public chartSize:number;

  //public configurable: boolean = true;
  public animateState;
  public flipAnimation = "stop";
  public flipDirection = "vertical";
  public isFlipped: boolean = false;

  constructor(public translate: TranslateService){
    super();
    this.core = CoreServiceInjector.get(CoreService);
    this.themeService = CoreServiceInjector.get(ThemeService);
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.isCompact && !changes.isCompact.firstChange){
      this.animateChange();
    }
  }

  ngAfterViewInit(){
  }

  animateChange(){

      if(this.isCompact){
        this.animateState = {
          tween:{
            from: {width: '600px'},
            to: { width: '240px'},
            duration: 125
          }
        } 
      } else if(!this.isCompact){        
        this.animateState = {
          tween: {
            from: {width: '240px'},
            to: { width: '600px'},
            duration: 125
          }
        }
      }

  }

  toggleConfig(){
    if(this.isFlipped){
      this.flipAnimation = "unflip";
    } else {
      this.flipAnimation = "flip"
    }

    if(this.flipDirection == "vertical"){
      this.flipAnimation += "V";
    } else if(this.flipDirection == "horizontal"){
      this.flipAnimation += "H";
    }

    this.isFlipped = !this.isFlipped;
  }

  setPreferences(form:NgForm){
    console.log("******** FORM SUBMITTED!! ********");
    console.log(form);
  }

  goBack(){
    this.back.emit();
  }

}
