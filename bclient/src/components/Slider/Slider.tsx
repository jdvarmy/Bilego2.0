import React, { useEffect } from 'react';
import SkeletonSlider from '../Skeletons/SkeletonSlider';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { sliderSelector } from '../../store/selectors';
import { getSlidesClientSide } from '../../store/slider/sliderSlice';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import AnimationStyles from './Slider.module.scss';
import Button from '../Button/Button';
import { Slide } from '../../types/types';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
  const dispatch = useDispatch();
  const { slides } = useTypeSelector(sliderSelector);

  useEffect(() => {
    if (!slides.length) {
      dispatch(getSlidesClientSide());
    }
  }, [slides.length, dispatch]);

  return (
    <div>
      <AutoplaySlider
        play={false}
        cancelOnInteraction={true}
        interval={6000}
        animation='openAnimation'
        bullets={false}
        organicArrows={false}
        startupScreen={<SkeletonSlider />}
        className='mt-9 h-slider rounded-3xl overflow-hidden'
        cssModule={[AnimationStyles]}
      >
        {slides.map((slide: Slide) => (
          <div key={slide.slug} data-src={slide.image}>
            <div className='absolute top-0 left-0 w-full h-full bg-black-700 opacity-50' />
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-900 to-black-800' />
            <div className='absolute bottom-44 left-14 text-white select-none'>
              <div>
                {slide.categories.genre &&
                  slide.categories.genre.map((term) => (
                    <span
                      key={term.name}
                      className='inline-block text-xs border border-turquoise-500 rounded-2xl py-1 px-3 lowercase mb-5'
                    >
                      {term.name}
                    </span>
                  ))}
              </div>
              <p className='text-7xl font-bold'>{slide.title}</p>
            </div>
            <Button link={`events/${slide.slug}`} className='absolute bottom-24 text-xl left-14'>
              ГОУ
            </Button>
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
};

export default Slider;
