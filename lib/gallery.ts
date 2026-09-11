// Gallery photos. Staff can add entries here (or drop images in
// /public/images/gallery) to expand the scrapbook.

export type GalleryPhoto = {
  src: string
  caption: string
  alt: string
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: '/images/gallery/ict computer learning.jpg',
    caption: 'Learning with technology',
    alt: 'Pupils learning computer skills at school',
  },
  {
    src: '/images/gallery/agricutlure.jpg',
    caption: 'Growing through practical learning',
    alt: 'Pupils taking part in an agriculture activity',
  },
  {
    src: '/images/gallery/creative.jpeg',
    caption: 'Creative expression',
    alt: 'Pupils taking part in a creative arts activity',
  },
  {
    src: '/images/gallery/physical.jpeg',
    caption: 'Play, fitness, and teamwork',
    alt: 'Pupils participating in physical education and sports',
  },
  {
    src: '/images/gallery/hero1.jpg',
    caption: 'A place to learn and belong',
    alt: 'Mukono Junior School campus',
  },
  {
    src: '/images/gallery/hero2.jpeg',
    caption: 'Everyday school life',
    alt: 'Pupils learning together at Mukono Junior School',
  },
  {
    src: '/images/gallery/hero3.webp',
    caption: 'Growing with pride',
    alt: 'Students enjoying a school activity',
  },
  {
    src: '/images/gallery/hero4.jpg',
    caption: 'Together we thrive',
    alt: 'Pupils taking part in a school activity',
  },
]
