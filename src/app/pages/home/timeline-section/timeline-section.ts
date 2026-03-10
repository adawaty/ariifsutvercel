import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  private ctx!: gsap.Context;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      this.ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        if (this.headerSection) {
          tl.from(this.headerSection.nativeElement.children, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
          });
        }

        if (this.timelineItems && this.timelineItems.length > 0) {
          const items = this.timelineItems.map(i => i.nativeElement);
          tl.from(items, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          }, "-=0.4");
        }

        setTimeout(() => ScrollTrigger.refresh(), 200);
      });
    }, 500);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
