import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-project-categories-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-categories-section.html',
  styleUrl: './project-categories-section.css',
})
export class ProjectCategoriesSection implements AfterViewInit, OnDestroy {
  @ViewChild('headerSection') headerSection!: ElementRef<HTMLDivElement>;
  @ViewChildren('categoryCard') categoryCards!: QueryList<ElementRef<HTMLDivElement>>;

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

        if (this.categoryCards && this.categoryCards.length > 0) {
          const cards = this.categoryCards.map(c => c.nativeElement);
          tl.from(cards, {
            y: 60,
            scale: 0.95,
            opacity: 0,
            duration: 1,
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
