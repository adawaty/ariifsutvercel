import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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
  @ViewChild('container') container!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.container.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse'
        }
      });

      const cards = this.criteriaCards.map(c => c.nativeElement);

      tl.from(this.headerSection.nativeElement.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })
        .from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }, "-=0.4")
        .from(this.highlightBanner.nativeElement, {
          y: 60,
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.7)'
        }, "-=0.2");
    }, this.container.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
