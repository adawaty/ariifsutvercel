import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-timeline-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-section.html',
  styleUrl: './timeline-section.css',
})
export class TimelineSection implements AfterViewInit, OnDestroy {
  @ViewChild('headerSection') headerSection!: ElementRef<HTMLDivElement>;
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  @ViewChild('timelineLine') timelineLine!: ElementRef<HTMLDivElement>;
  @ViewChild('timelineLineMobile') timelineLineMobile!: ElementRef<HTMLDivElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {

      // 1. Initial header animation
      gsap.from(this.headerSection.nativeElement.children, {
        scrollTrigger: {
          trigger: this.headerSection.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // 2. Main Timeline for the glowing line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.max-w-4xl', // Container for vertical timeline items
          start: 'top center+=100',
          end: 'bottom center+=100',
          scrub: 1, // Smooth scrubbing
        }
      });

      // Draw the central glowing line downwards (Desktop)
      if (this.timelineLine) {
        gsap.set(this.timelineLine.nativeElement, { scaleY: 0, transformOrigin: 'top center' });
        tl.to(this.timelineLine.nativeElement, {
          scaleY: 1,
          ease: 'none'
        }, 0);
      }
      
      // Draw the left glowing line downwards (Mobile)
      if (this.timelineLineMobile) {
        gsap.set(this.timelineLineMobile.nativeElement, { scaleY: 0, transformOrigin: 'top center' });
        tl.to(this.timelineLineMobile.nativeElement, {
          scaleY: 1,
          ease: 'none'
        }, 0); // start at the same time as desktop line
      }

      // 3. Animate the timeline elements as they come into view
      if (this.timelineItems && this.timelineItems.length > 0) {
        const items = this.timelineItems.map(i => i.nativeElement);

        items.forEach((item, index) => {
           // We animate the components of the timelineItem individually
           // Find the content box within the item by targeting the generic 'relative' sub div
           const contentBox = item.querySelector('.bg-white\\/5') || item.querySelector('.bg-white\\/10');
           const node = item.querySelector('.rounded-full.border-4');
           const dateText = item.querySelector('span.font-black');

           // Content Box Animation
           if (contentBox) {
               gsap.from(contentBox, {
                 scrollTrigger: {
                   trigger: item,
                   start: 'top center+=200',
                   toggleActions: 'play none none reverse'
                 },
                 x: index % 2 === 0 ? -50 : 50, // Alternate left/right based on index
                 opacity: 0,
                 duration: 0.8,
                 ease: 'back.out(1.2)'
               });
           }

           // Node / Orb Animation
           if (node) {
               gsap.from(node, {
                 scrollTrigger: {
                   trigger: item,
                   start: 'top center+=200',
                   toggleActions: 'play none none reverse'
                 },
                 scale: 0,
                 opacity: 0,
                 duration: 0.5,
                 ease: 'back.out(2)'
               });
           }

           // Date text Animation
           if (dateText) {
               gsap.from(dateText, {
                 scrollTrigger: {
                   trigger: item,
                   start: 'top center+=200',
                   toggleActions: 'play none none reverse'
                 },
                 x: index % 2 === 0 ? 50 : -50, // Move opposite to the box
                 opacity: 0,
                 duration: 0.8,
                 ease: 'back.out(1.2)'
               });
           }
        });
      }

    }, this.container.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
