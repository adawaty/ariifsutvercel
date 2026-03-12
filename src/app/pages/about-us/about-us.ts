import { Component, ElementRef, ViewChildren, ViewChild, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs implements AfterViewInit, OnDestroy {
  @ViewChildren('animSection') animSections!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('typewriterText') typewriterTexts!: QueryList<ElementRef<HTMLParagraphElement>>;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Provide a brief timeout for Angular router to stabilize the viewport size and scroll position
    setTimeout(() => {
      this.ctx = gsap.context(() => {

        this.animSections.forEach((section, index) => {

          if (index === 0) {
            // The hero section should animate in automatically on load, bypassing ScrollTrigger
            gsap.fromTo(section.nativeElement,
              { y: 50, opacity: 0, scale: 0.98 },
              { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
            );
          } else {
            // Sub-sections animate only on scroll
            gsap.fromTo(section.nativeElement,
              { y: 80, opacity: 0, scale: 0.98 },
              {
                scrollTrigger: {
                  trigger: section.nativeElement,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                },
                y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out'
              }
            );
          }

          // Stagger inner children if it's the objectives list
          const listItems = section.nativeElement.querySelectorAll('li');
          if (listItems.length > 0) {
            gsap.fromTo(listItems,
              { opacity: 0, x: -30 },
              {
                scrollTrigger: {
                  trigger: section.nativeElement,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse'
                },
                opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: index === 0 ? 0.6 : 0.2
              }
            );
          }
        });

        // 2. Typewriter Effect
        // Split text into chars and reveal them sequentially
        this.typewriterTexts.forEach(textEl => {
          const text = new SplitType(textEl.nativeElement, { types: 'words,chars' });

          // Ensure chars start invisible
          gsap.set(text.chars, { opacity: 0 });

          gsap.to(text.chars, {
            scrollTrigger: {
              trigger: textEl.nativeElement,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            duration: 0.1,
            stagger: 0.015,
            ease: 'power1.inOut'
          });
        });

        // Ensure triggers are properly calculated after initial render
        ScrollTrigger.refresh();
      });
    }, 100);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
