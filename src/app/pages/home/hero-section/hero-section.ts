import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements AfterViewInit, OnDestroy {
  @ViewChild('heroContainer') heroContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('titleText') titleText!: ElementRef<HTMLHeadingElement>;
  @ViewChild('subtitleText') subtitleText!: ElementRef<HTMLParagraphElement>;
  @ViewChild('ctaButton') ctaButton!: ElementRef<HTMLAnchorElement>;

  // 3D Elements Ref
  @ViewChild('track1') track1!: ElementRef<HTMLDivElement>;
  @ViewChild('track2') track2!: ElementRef<HTMLDivElement>;
  @ViewChild('track3') track3!: ElementRef<HTMLDivElement>;

  private ctx!: gsap.Context;
  private mouseX = 0;
  private mouseY = 0;

  ngAfterViewInit() {
    // Create a GSAP Context for easy cleanup
    this.ctx = gsap.context(() => {

      const tl = gsap.timeline();

      // Setup initial states
      gsap.set([this.titleText.nativeElement, this.subtitleText.nativeElement, this.ctaButton.nativeElement], {
        y: 50,
        opacity: 0
      });

      gsap.set([this.track1.nativeElement, this.track2.nativeElement, this.track3.nativeElement], {
        scale: 0.5,
        opacity: 0,
        rotationX: 10,
        rotationY: -10
      });

      // 1. Enter text elements
      tl.to(this.titleText.nativeElement, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      })
        .to(this.subtitleText.nativeElement, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
        .to(this.ctaButton.nativeElement, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.5)'
        }, '-=0.4')

        // 2. Animate the 3D track items popping into space
        .to([this.track1.nativeElement, this.track2.nativeElement, this.track3.nativeElement], {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'elastic.out(1, 0.5)'
        }, '-=0.5');

      // Continuous floating animation
      gsap.to(this.track1.nativeElement, {
        y: '-=15',
        rotationX: '+=5',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(this.track2.nativeElement, {
        y: '+=20',
        rotationY: '+=5',
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(this.track3.nativeElement, {
        y: '-=10',
        rotationZ: '+=3',
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

    }, this.heroContainer.nativeElement);
  }

  // Parallax tracking mechanism
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.heroContainer) return;

    const { innerWidth, innerHeight } = window;
    // Normalize mouse coordinates from -1 to 1 based on center of screen
    this.mouseX = (event.clientX / innerWidth) * 2 - 1;
    this.mouseY = (event.clientY / innerHeight) * 2 - 1;

    // Move the tracks opposite to mouse movement
    if (this.track1 && this.track2 && this.track3) {
      gsap.to(this.track1.nativeElement, {
        x: this.mouseX * -30,
        y: this.mouseY * -30,
        rotationY: this.mouseX * 15,
        rotationX: this.mouseY * -15,
        duration: 1,
        ease: 'power1.out'
      });

      gsap.to(this.track2.nativeElement, {
        x: this.mouseX * -50,
        y: this.mouseY * -50,
        rotationY: this.mouseX * 25,
        rotationX: this.mouseY * -25,
        duration: 1,
        ease: 'power1.out'
      });

      gsap.to(this.track3.nativeElement, {
        x: this.mouseX * -20,
        y: this.mouseY * -20,
        rotationY: this.mouseX * 10,
        rotationX: this.mouseY * -10,
        duration: 1,
        ease: 'power1.out'
      });
    }
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert(); // Cleanup GSAP animations to prevent memory leaks
    }
  }
}
