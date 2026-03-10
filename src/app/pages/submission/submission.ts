import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-submission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submission.html',
  styleUrl: './submission.css',
})
export class Submission implements AfterViewInit, OnDestroy {
  @ViewChildren('animSection') animSections!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('checkIcon') checkIcons!: QueryList<ElementRef<SVGElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {

      // 1. Animate each main section as it enters viewport
      this.animSections.forEach((section, index) => {
        gsap.fromTo(section.nativeElement,
          {
            y: 80,
            opacity: 0,
            scale: 0.95
          },
          {
            scrollTrigger: {
              trigger: section.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
          }
        );
      });

      // 2. Animate the checklist icons specifically
      if (this.checkIcons && this.checkIcons.length > 0) {
        // Find the parent section of the first icon to use as a trigger
        const listContainer = this.checkIcons.first.nativeElement.closest('ul');

        gsap.fromTo(this.checkIcons.map(icon => icon.nativeElement),
          {
            scale: 0,
            opacity: 0,
            rotation: -45
          },
          {
            scrollTrigger: {
              trigger: listContainer,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(2)'
          }
        );
      }

    });
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
