import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-who-can-participate-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './who-can-participate-section.html',
  styleUrl: './who-can-participate-section.css',
})
export class WhoCanParticipateSection implements AfterViewInit, OnDestroy {
  @ViewChild('titleSection') titleSection!: ElementRef<HTMLDivElement>;
  @ViewChild('criteriaList') criteriaList!: ElementRef<HTMLDivElement>;
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

      if (this.titleSection) {
        tl.from(this.titleSection.nativeElement.children, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        });
      }

      if (this.criteriaList) {
        tl.from(this.criteriaList.nativeElement, {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, "-=0.8");

        const items = this.criteriaList.nativeElement.querySelectorAll('.criteria-item');
        if (items.length > 0) {
          tl.from(items, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
          }, "-=0.4");
        }
      }
    }, this.container.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
