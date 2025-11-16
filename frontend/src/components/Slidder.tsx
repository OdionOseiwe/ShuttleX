import React from 'react'


function slidder() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    
    const images=[
        {img: "https://www.shutterstock.com/image-vector/mobile-app-hail-ride-service-600nw-2562902409.jpg"},
        {img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrOOaGReubdl-j8HsbTjYJD674PtG4Lg656w&s"},
        {img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvcu_2wP9lKumRVZuUnbstzR3hgM8TaUErCA&s"}

    ]

    // previous 0 => 0 + 1 => 1 % 3 = 1
    // previous 1 => 1 + 1 => 2 % 3 = 2
    // previous 2 => 2 + 1 => 3 % 3 = 0 
    // previous 0 => 0 + 1 => 1 % 3 = 1

  // Add clone of first slide at the end

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 2);
      }, 4000);
      return () => clearInterval(interval);
    }, []);

    // translateX(-(1 * 100)) = -100
    // translateX(-(2 * 100)) = -200
    // translateX(-(0 * 100)) = 0

    return (
      <div className='relative z-1 w-full h-96 overflow-hidden'>  
        <div 
        className="flex transition-transform duration-1000 ease-in-out h-full "
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >      
            {images.map((slide, idx) => (
                <div className='min-w-full relative flex items-center justify-center'  key={idx}>
                    <img className='w-100 h-96' src={slide.img} />
                </div>
            ))}
        </div>
            
        </div>
    )
}

export default slidder
