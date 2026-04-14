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


const colors = [
    "bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500",
    "bg-gradient-to-br from-rose-600 via-red-500 to-orange-400",
    "bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400",
    "bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-400",
];

const HeroBanner = () => {
    return (
        <div className='py-2 rounded-2xl overflow-hidden'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                slidesPerView={1}
                className="rounded-2xl overflow-hidden"
            >

                {bannerList.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className={`carousel-item rounded-2xl lg:h-[520px] sm:h-auto ${colors[i]} relative flex flex-col-reverse lg:flex-row items-center justify-center p-6 lg:p-4 gap-6 lg:gap-0 overflow-hidden`}>

                            {/* Decorative floating shapes */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" />
                            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />

                            {/* Subtle overlay for text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

                            {/* Text Container */}
                            <div className='flex flex-col justify-center w-full lg:w-1/2 lg:p-8 text-center lg:text-left z-10'>
                                <div className='w-full'>
                                    <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs sm:text-sm font-semibold tracking-wide mb-4 border border-white/20 animate-fade-in-down">
                                        ⚡ {item.title}
                                    </span>
                                    <h1 className='text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold mt-2 drop-shadow-lg leading-tight animate-fade-in-up'>
                                        {item.subtitle}
                                    </h1>
                                    <p className='text-sm sm:text-base text-white/80 font-medium mt-4 sm:mt-5 max-w-md mx-auto lg:mx-0 animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
                                        {item.description}
                                    </p>
                                    <Link className='mt-6 sm:mt-8 inline-flex items-center gap-2 bg-white text-slate-900 font-bold py-3 px-8 rounded-full shadow-xl
                                        hover:bg-white/90 hover:scale-105 hover:shadow-2xl transition-all duration-300
                                        animate-fade-in-up group'
                                        style={{ animationDelay: '0.4s' }}
                                        to={"/products"}>
                                        Shop Now
                                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Image Container */}
                            <div className='w-full flex justify-center lg:w-1/2 h-[250px] sm:h-[350px] lg:h-full relative z-10'>
                                <img
                                    src={item?.image}
                                    alt={item.title}
                                    className="object-contain max-h-full max-w-full drop-shadow-2xl transition-transform duration-700 hover:scale-105 animate-slide-in-right"
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