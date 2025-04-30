import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../category/services/category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule, NgFor],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent {
  categories: any[] = []
  private readonly categoryService = inject(CategoryService)
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: ({ data }) => {

        this.categories = data
      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this.getCategories()
  }

}
