import React from 'react';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const IconLogo = ({ width, height, fill }: Props) => {
  return (
    <svg
      width={width ?? 154}
      height={height ?? 38}
      viewBox='0 0 154 38'
      fill={fill ?? 'none'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M141.34 16.43C141.34 18.61 139.57 20.38 137.39 20.38C135.21 20.38 133.44 18.61 133.44 16.43C133.44 14.25 135.21 12.48 137.39 12.48C139.57 12.47 141.34 14.24 141.34 16.43Z'
        fill='#FF336D'
      />
      <path
        d='M20.53 15.42C22.74 14.18 24.6 12.23 24.6 8.74C24.6 6.52999 23.89 4.8 22.48 3.39C20.71 1.62 17.92 0.649995 14.38 0.649995H6.83V0.619995L6.82 0.639995H6.63L5.25 0.649995C3 0.649995 0 2.6 0 6.9C0 7.02 0 9.69 0 9.81V18.59C0 21.15 0 23.06 0 23.06L0.02 26.19C0.02 29.63 2.54 31.58 4.52 31.58L6.58 31.61H14.73C21.72 31.61 26.32 28.78 26.32 23.11C26.33 18.87 24.12 16.79 20.53 15.42ZM8.87 6.61C10.5 6.61 13.37 6.61 13.37 6.61C16.25 6.61 17.84 7.76 17.84 9.8C17.84 12.19 15.94 13.16 12.93 13.16H6.86V8.81999C6.86 8.81999 6.74 6.61 8.87 6.61ZM14.74 25.64C14.74 25.64 10.98 25.64 8.8 25.64C7.16 25.64 6.88 24.33 6.84 23.69V23.34V18.83H14.52C18.02 18.83 19.57 20.11 19.57 22.19C19.56 24.58 17.75 25.64 14.74 25.64Z'
        fill='white'
      />
      <path
        d='M36.37 0.650015C34.11 0.650015 31.12 2.61001 31.12 6.90001C31.12 7.02001 31.12 9.69001 31.12 9.81001V18.59C31.12 21.15 31.12 23.06 31.12 23.06L31.14 26.19C31.14 29.63 33.66 31.58 35.64 31.58L37.7 31.61H37.94V0.640015H37.75L36.37 0.650015Z'
        fill='white'
      />
      <path
        d='M76.74 6.84C79.13 6.84 82.99 6.84 86.39 6.84C91.8 6.84 92.52 0.639995 92.52 0.639995H76.74H76.36H75.01V0.619995L75 0.639995H74.81L73.43 0.649995C71.17 0.649995 68.18 2.61 68.18 6.9C68.18 7.02 68.18 9.69 68.18 9.81V18.59C68.18 21.15 68.18 23.06 68.18 23.06L68.2 26.19C68.2 29.63 70.72 31.58 72.7 31.58L74.76 31.61H75.01C75.01 31.61 75.66 31.61 76.74 31.61C78.72 31.61 82.15 31.61 85.65 31.61C91.06 31.61 91.78 25.41 91.78 25.41H76.74C75.3 25.29 75.04 24.08 75.01 23.47V23.12V19.22C77.16 19.22 79.74 19.22 82.09 19.22C87.5 19.22 88.22 13.02 88.22 13.02H75.04V9.02C75.04 9.02 74.94 7.04 76.74 6.84Z'
        fill='white'
      />
      <path
        d='M51.49 23.48V8.82001V0.640015H51.27L49.89 0.650015C47.63 0.650015 44.64 2.61001 44.64 6.90001C44.64 7.02001 44.64 9.69001 44.64 9.81001V18.59C44.64 21.15 44.64 23.06 44.64 23.06L44.66 26.19C44.66 29.63 47.18 31.58 49.16 31.58L50.1 31.59V31.61C50.1 31.61 50.5 31.61 51.22 31.61C51.72 31.61 52.39 31.61 53.2 31.61C54.67 31.61 56.62 31.61 58.93 31.61C64.34 31.61 65.06 25.41 65.06 25.41H53.2C51.76 25.3 51.53 24.1 51.49 23.48Z'
        fill='white'
      />
      <path
        d='M137.39 0C128.72 0 121.63 6.8 121.18 15.36C124.05 15.8 126.33 16.37 127.94 16.86C127.93 16.72 127.92 16.58 127.92 16.44C127.92 11.21 132.16 6.96 137.4 6.96C142.64 6.96 146.88 11.2 146.88 16.44C146.88 21.68 142.64 25.92 137.4 25.92C134.79 25.92 132.42 24.86 130.71 23.15C130.28 24.52 129.7 26.09 128.92 27.69C128.62 28.3 128.31 28.89 127.98 29.46C130.64 31.36 133.89 32.47 137.4 32.47C146.37 32.47 153.64 25.2 153.64 16.23C153.62 7.27 146.36 0 137.39 0Z'
        fill='white'
      />
      <path
        d='M111.7 17.64C111.07 17.64 110.42 17.65 109.78 17.67C110.01 18.24 110.45 19.03 111.25 19.95C112.35 21.22 113.78 22.35 115.4 23.26C113.75 24.78 111.55 25.71 109.13 25.71C104.01 25.71 99.63 21.33 99.63 16.21C99.63 11.09 103.85 7.01 108.97 7.01C110.1 7.01 111.17 7.21 112.17 7.58C112.36 7.65 112.56 7.73 112.74 7.82C115.51 8.73 119.77 7.14 120.54 4.7C117.61 1.79 113.58 0 109.13 0C100.16 0 92.89 7.27 92.89 16.24C92.89 25.21 100.16 32.48 109.13 32.48C111.66 32.48 114.5 32.01 117.08 30.67C116.44 33.25 116.16 35.6 116.22 37.05C124.9 32.51 127.66 23.52 128.41 20.16C126.08 19.35 120.13 17.64 111.7 17.64Z'
        fill='white'
      />
    </svg>
  );
};

export default IconLogo;
