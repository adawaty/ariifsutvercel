import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-guidelines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guidelines.html',
  styleUrl: './guidelines.css',
})
export class Guidelines implements AfterViewInit, OnDestroy {
  @ViewChild('timelineLine') timelineLine!: ElementRef<HTMLDivElement>;
  @ViewChildren('stepCard') stepCards!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('glowOrb') glowOrbs!: QueryList<ElementRef<HTMLDivElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top center+=100',
          end: 'bottom center+=100',
          scrub: 1, // Smooth scrubbing
        }
      });

      // 1. Draw the central glowing line downwards
      if (this.timelineLine) {
        gsap.set(this.timelineLine.nativeElement, { scaleY: 0, transformOrigin: 'top center' });
        tl.to(this.timelineLine.nativeElement, {
          scaleY: 1,
          ease: 'none'
        });
      }

      // 2. Animate the cards and orbs as the line reaches them
      if (this.stepCards.length > 0 && this.glowOrbs.length > 0) {
        const cards = this.stepCards.map(c => c.nativeElement);
        const orbs = this.glowOrbs.map(o => o.nativeElement);

        cards.forEach((card, index) => {

          // Animate Card
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top center+=200',
              toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -50 : 50, // Alternate left/right based on index
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.2)'
          });

          // Animate Orb
          if (orbs[index]) {
            gsap.from(orbs[index], {
              scrollTrigger: {
                trigger: card, // Use the card as the trigger for the orb too so they sync
                start: 'top center+=200',
                toggleActions: 'play none none reverse'
              },
              scale: 0,
              opacity: 0,
              duration: 0.5,
              ease: 'back.out(2)'
            });
          }
        });
      }

    });
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
