import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-judiging-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './judiging-section.html',
  styleUrl: './judiging-section.css',
})
export class JudigingSection implements AfterViewInit, OnDestroy {
  @ViewChild('headerSection') headerSection!: ElementRef<HTMLDivElement>;
  @ViewChild('highlightBanner') highlightBanner!: ElementRef<HTMLDivElement>;
  @ViewChildren('criteriaCard') criteriaCards!: QueryList<ElementRef<HTMLDivElement>>;

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

        if (this.criteriaCards && this.criteriaCards.length > 0) {
          const cards = this.criteriaCards.map(c => c.nativeElement);
          tl.from(cards, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          }, "-=0.4");
        }

        if (this.highlightBanner) {
          tl.from(this.highlightBanner.nativeElement, {
            y: 50,
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.7)'
          }, "-=0.2");
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
