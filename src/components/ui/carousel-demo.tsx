import { ThreeDPhotoCarousel } from "./3d-carousel"

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="min-h-[500px] flex flex-col justify-center space-y-4">
        <div className="p-2">
          <ThreeDPhotoCarousel />
        </div>
      </div>
    </div>
  )
}
