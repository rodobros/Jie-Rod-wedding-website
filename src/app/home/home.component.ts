import { Component, OnInit } from '@angular/core';
import { NgxCarouselModule, NgxCarouselStore } from 'ngx-carousel';
/**
 * Defines the component responsible to display the home page.
 */
@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public carouselBanner;

  ngOnInit(){

    this.carouselBanner = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 600,
      interval: 6000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 35px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li:hover {
            text-shadow: 1px 0px 20px #11aec1;
            cursor: pointer;
          } 
          .ngxcarouselPoint li.active {
              background: white;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    }
  }
}
