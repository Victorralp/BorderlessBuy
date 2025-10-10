"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, User, Mail, ShoppingBag, ArrowRight } from "lucide-react"

// Updated slides with local images and content
const slides = [
  {
    id: 1,
    title: "Grova - Your everyday grocery shop",
    subtitle: "Discover authentic flavors from around the world",
    description: "Experience the tastes of home with our carefully curated selection of international groceries",
    image: "/product_images/beverages/coke-50cl-250x250.jpg",
    cta: "Shop Now",
    ctaLink: "/shop"
  },
  {
    id: 2,
    title: "Fresh Beverages from Home",
    subtitle: "Authentic drinks from your homeland",
    description: "Quench your thirst with our wide range of international beverages and refreshments",
    image: "/product_images/beverages/Fanta-PET-Bottles-50cl.jpg",
    cta: "View Collection",
    ctaLink: "/shop?category=beverages"
  },
  {
    id: 3,
    title: "Traditional African Foods",
    subtitle: "Authentic ingredients for your favorite dishes",
    description: "Get premium quality African foods and spices delivered fresh to your door",
    image: "/product_images/rice/Aani-Basmatic-rice-10kg-4-250x250.jpg",
    cta: "Shop Foods",
    ctaLink: "/shop?category=food"
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean[]>([true, true, true])
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Function to handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // swipe left
      nextSlide()
    }
    
    if (touchStart - touchEnd < -50) {
      // swipe right
      prevSlide()
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length
        console.log(`Hero slider: Moving from slide ${prev} to slide ${nextSlide}`)
        return nextSlide
      })
    }, 5000) // Reduced to 5 seconds for better visibility
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleImageLoad = (index: number) => {
    setIsLoading((prev) => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter-section')
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative h-[600px] sm:h-[650px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-50 to-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Loading effect */}
          {isLoading[index] && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            quality={90}
            priority={index === 0}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI2QTlcpAAAAABJRU5ErkJggg=="
            className="object-cover transition-transform duration-10000 ease-out"
            onLoad={() => handleImageLoad(index)}
            onError={(e) => {
              console.error(`Failed to load hero image: ${slide.image}`);
              const imgElement = e.currentTarget as HTMLImageElement;
              imgElement.src = "/placeholder.jpg";
              imgElement.onerror = null;
            }}
            style={{ 
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
              transitionDuration: '15000ms'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-start">
            <div
              className={`max-w-2xl px-6 md:px-16 transform transition-all duration-700 ease-out ${
                index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 mb-6 bg-emerald-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">Limited Offers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight">
                {slide.title}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl mb-6 text-white/95 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              <p className="hidden md:block text-white/85 max-w-lg mb-8 text-base leading-relaxed">
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-gray-900 hover:bg-gray-50 px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all rounded-lg group"
                >
                  <Link href={slide.ctaLink} className="flex items-center gap-2">
                    {slide.cta}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToNewsletter}
                  className="bg-transparent text-white border-2 border-white/40 backdrop-blur-sm hover:bg-white/10 px-8 py-6 text-base font-semibold transition-all rounded-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 h-12 w-12 rounded-full backdrop-blur-sm bg-white/10 hover:scale-105 border border-white/20 transition-all"
        onClick={() => {
          console.log('Hero slider: Previous button clicked')
          prevSlide()
        }}
      >
        <ChevronLeft className="h-7 w-7" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 h-12 w-12 rounded-full backdrop-blur-sm bg-white/10 hover:scale-105 border border-white/20 transition-all"
        onClick={() => {
          console.log('Hero slider: Next button clicked')
          nextSlide()
        }}
      >
        <ChevronRight className="h-7 w-7" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[50] bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8 h-2"
                : "bg-white/50 hover:bg-white/75 w-2 h-2"
            }`}
            onClick={() => {
              console.log(`Hero slider: Manual navigation to slide ${index}`)
              setCurrentSlide(index)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
