// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { bannerList } from '../../utils';
import { Link } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';


const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3", "bg-banner-color4"];

const HeroBanner = () => {
    return (
        <div className='py-2 rounded-md'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                slidesPerView={1}>

                {bannerList.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className={`carousel-item rounded-md lg:h-[500px] sm:h-auto ${colors[i]} flex flex-col-reverse lg:flex-row items-center justify-center p-6 lg:p-4 gap-6 lg:gap-0`}>
                            {/* Text Container: Now visible on all screens */}
                            <div className='flex flex-col justify-center w-full lg:w-1/2 lg:p-8 text-center lg:text-left z-10'>
                                <div className='w-full'>
                                    <h3 className='text-2xl sm:text-3xl text-white font-bold drop-shadow-md'>
                                        {item.title}
                                    </h3>
                                    <h1 className='text-3xl sm:text-5xl text-white font-extrabold mt-2 sm:mt-4 drop-shadow-md leading-tight'>
                                        {item.subtitle}
                                    </h1>
                                    <p className='text-sm sm:text-base text-white/90 font-medium mt-3 sm:mt-5 max-w-md mx-auto lg:mx-0'>
                                        {item.description}
                                    </p>
                                    <Link className='mt-6 sm:mt-8 inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300'
                                        to={"/products"}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>

                            {/* Image Container */}
                            <div className='w-full flex justify-center lg:w-1/2 h-[250px] sm:h-[350px] lg:h-full relative'>
                                <img
                                    src={item?.image}
                                    alt={item.title}
                                    className="object-contain max-h-full max-w-full drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HeroBanner;