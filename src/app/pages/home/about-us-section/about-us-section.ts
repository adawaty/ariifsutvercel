import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about-us-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us-section.html',
  styleUrl: './about-us-section.css',
})
export class AboutUsSection implements AfterViewInit, OnDestroy {
  @ViewChild('aboutContainer') aboutContainer!: ElementRef<HTMLElement>;
  @ViewChild('headerSection') headerSection!: ElementRef<HTMLDivElement>;
  @ViewChild('bentoGrid') bentoGrid!: ElementRef<HTMLDivElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.aboutContainer.nativeElement,
          start: 'top 80%', // Animation starts when top of container hits 80% down viewport
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse', // Play on enter, reverse on leave, play on re-enter
        }
      });

      // 1. Fade up the header text
      tl.from(this.headerSection.nativeElement.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })

        // 2. Pop in the Bento Box grid items (Objectives and Principles)
        .from(this.bentoGrid.nativeElement.children, {
          y: 60,
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        }, '-=0.4'); // Start slightly before the header finishes

    }, this.aboutContainer.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
