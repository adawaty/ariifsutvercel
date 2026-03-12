import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-need-help-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './need-help-section.html',
  styleUrl: './need-help-section.css',
})
export class NeedHelpSection implements AfterViewInit, OnDestroy {
  @ViewChild('helpContent') helpContent!: ElementRef<HTMLDivElement>;
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
    }, this.container.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
