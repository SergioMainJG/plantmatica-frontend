import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'image-optimized',
  imports: [NgOptimizedImage],
  templateUrl: './image.html',
  styles: ``,
})
export default class Image {
  public readonly classStyle = input.required<string>();
  public readonly ngSrc = input.required<string>();
  public readonly titleAlt = input.required<string>();
  public readonly isPriorityLoad = input<boolean>(false);
}