import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function NewsCarousel() {
  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
    })
  );

  return (
    <section className="container mx-auto px-15 mb-10">
      <h2 className="text-2xl font-bold my-6 text-center">NEWS</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {[...Array(6)].map((_, idx) => (
            <CarouselItem key={idx} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="p-0">
                  <div
                    className="aspect-[4/3] rounded-lg bg-contain bg-gray"
                    style={{
                      backgroundImage: `url("/news/ad_${idx + 1}.jpg")`,
                    }}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
