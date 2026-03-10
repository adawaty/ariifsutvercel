import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-competitions-tracks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competitions-tracks.html',
  styleUrl: './competitions-tracks.css',
})
export class CompetitionsTracks implements AfterViewInit, OnDestroy {
  @ViewChild('headerSection') headerSection!: ElementRef<HTMLDivElement>;
  @ViewChildren('trackCard') trackCards!: QueryList<ElementRef<HTMLDivElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {

      const tl = gsap.timeline();

      // 1. Fade up the header text
      if (this.headerSection) {
        tl.from(this.headerSection.nativeElement.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        });
      }

      // 2. Stagger pop-in the Track Cards
      if (this.trackCards.length > 0) {
        const cardElements = this.trackCards.map(tc => tc.nativeElement);
        tl.from(cardElements, {
          y: 50,
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        }, '-=0.4'); // Start slightly before the header finishes
      }

    });
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
