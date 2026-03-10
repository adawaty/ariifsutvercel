import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-need-help-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './need-help-section.html',
  styleUrl: './need-help-section.css',
})
export class NeedHelpSection implements AfterViewInit, OnDestroy {
  @ViewChild('helpContent') helpContent!: ElementRef<HTMLDivElement>;

  private ctx!: gsap.Context;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      this.ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        if (this.helpContent) {
          tl.from(this.helpContent.nativeElement, {
            y: 60,
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          })
            .from(this.helpContent.nativeElement.children, {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power2.out'
            }, "-=0.6");
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
