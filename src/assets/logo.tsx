import { ComponentPropsWithoutRef } from "react";

const PRIMARY = "#EA4C89";

export default function Logo({
  dotColor = "#EA4C89",
  textColor = "white",
  variant,
  style,
  ...svgProps
}: {
  textColor?: string;
  dotColor?: string;
  variant?: "dark" | "light" | undefined;
} & ComponentPropsWithoutRef<"svg">) {
  const colors = {
    ...(variant === "dark" && {
      "--text-color": "#515EBD",
      "--dot-color": PRIMARY,
    }),
    ...(variant === "light" && {
      "--text-color": "white",
      "--dot-color": PRIMARY,
    }),
    ...(!variant && {
      "--text-color": textColor,
      "--dot-color": dotColor,
    }),
  };

  return (
    <svg
      viewBox="0 0 165 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...colors,
        ...style,
      }}
      {...svgProps}
    >
      <path
        d="M45.5198 14.7841C44.2207 13.5024 42.6902 12.4788 41.0096 11.7677C38.2528 10.6031 35.1968 10.3462 32.2843 11.0344C29.3719 11.7226 26.7541 13.3201 24.8101 15.5954C23.6281 14.2119 22.1935 13.0661 20.5829 12.2191C18.5874 11.1767 16.3644 10.6456 14.1132 10.6733C12.2269 10.6662 10.3589 11.0434 8.62321 11.782C6.94488 12.4962 5.41836 13.5242 4.12558 14.8109C2.8411 16.0878 1.81667 17.6019 1.10918 19.2692C0.363309 21.0114 -0.0142114 22.8891 0.000408977 24.7842V38.965H6.90724V24.7771C6.90302 23.3592 7.31783 21.9717 8.09954 20.7887C8.88126 19.6058 9.99502 18.6802 11.301 18.1282C12.1935 17.7577 13.1504 17.5669 14.1168 17.5669C15.0832 17.5669 16.04 17.7577 16.9325 18.1282C17.7998 18.4819 18.589 19.0031 19.2548 19.6621C19.9205 20.321 20.4497 21.1048 20.8122 21.9685C21.1869 22.8525 21.3753 23.8044 21.3657 24.7645V38.9399H28.2725V24.7771C28.2655 23.3567 28.6807 21.9662 29.4656 20.7824C30.2505 19.5985 31.3696 18.6747 32.6806 18.1282C33.5629 17.7475 34.5159 17.5588 35.4766 17.5747C37.408 17.5706 39.2637 18.3251 40.6442 19.6758C41.3046 20.337 41.8296 21.1206 42.19 21.9828C42.5647 22.8669 42.7531 23.8187 42.7435 24.7788V38.9543H49.6503V24.7788C49.6589 22.9228 49.2976 21.0837 48.5875 19.3688C47.8773 17.654 46.8327 16.0978 45.5144 14.7912"
        fill="var(--text-color)"
      />
      <path
        d="M80.9599 19.2533C80.2373 17.5889 79.2155 16.0712 77.9454 14.7753C76.6591 13.5015 75.1466 12.4786 73.4854 11.759C71.7458 11.0257 69.877 10.6479 67.9892 10.6479C66.1013 10.6479 64.2326 11.0257 62.493 11.759C60.8111 12.4747 59.2772 13.4976 57.9702 14.7753C56.6785 16.0617 55.6422 17.5811 54.9162 19.2533C53.8225 21.8519 53.5289 24.7178 54.073 27.4842C54.617 30.2506 55.9739 32.7918 57.9702 34.7828C59.2781 36.0691 60.8112 37.1042 62.493 37.8368C64.2301 38.5707 66.097 38.9477 67.9828 38.9456H82.0812V24.7827C82.0867 22.8825 81.7053 21.0012 80.9599 19.2533ZM75.1869 32.0638H67.9828C67.0109 32.0633 66.0481 31.8754 65.1474 31.5104C64.2805 31.1525 63.4903 30.632 62.819 29.9771C62.154 29.314 61.632 28.5215 61.2856 27.6486C60.9096 26.7555 60.7212 25.7946 60.7322 24.8256C60.7275 23.866 60.9157 22.9152 61.2856 22.0296C61.649 21.1721 62.1691 20.3898 62.819 19.7226C63.8437 18.7088 65.1453 18.021 66.5603 17.7459C67.9752 17.4708 69.4401 17.6208 70.77 18.1768C71.6266 18.5406 72.4056 19.0653 73.0645 19.7226C73.7332 20.3768 74.2593 21.1623 74.6101 22.0296C74.9848 22.9137 75.1734 23.8655 75.1637 24.8256L75.1869 32.0638Z"
        fill="var(--text-color)"
      />
      <path
        d="M113.408 19.1104C112.698 17.4352 111.66 15.9192 110.354 14.6522C109.054 13.3779 107.53 12.3552 105.858 11.6358C102.41 10.1814 98.5269 10.1528 95.0581 11.5561C91.5894 12.9595 88.8181 15.6804 87.3516 19.1229C86.6065 20.8654 86.2296 22.743 86.2446 24.638V55.0003C88.0762 54.9999 89.8327 54.272 91.1279 52.9769C92.4231 51.6817 93.151 49.9252 93.1515 48.0935V38.8152H100.356C102.247 38.8297 104.12 38.4522 105.858 37.7065C109.259 36.25 111.965 33.5343 113.41 30.128C114.141 28.3834 114.518 26.5108 114.518 24.6192C114.518 22.7276 114.141 20.8549 113.41 19.1104H113.408ZM107.171 27.5379C106.807 28.4046 106.283 29.1947 105.625 29.8665C104.962 30.5311 104.169 31.0529 103.297 31.3997C102.399 31.7745 101.434 31.9629 100.461 31.9532H93.2571V24.6846C93.2501 23.2642 93.6654 21.8738 94.4503 20.6899C95.2352 19.506 96.354 18.5822 97.6651 18.0357C98.5492 17.661 99.5011 17.4726 100.461 17.4822C101.433 17.4828 102.396 17.6707 103.297 18.0357C104.61 18.5775 105.733 19.4978 106.523 20.6795C107.312 21.8612 107.732 23.2509 107.73 24.672C107.724 25.6547 107.531 26.6272 107.162 27.5379H107.171Z"
        fill="var(--text-color)"
      />
      <path
        d="M135.948 0C135.142 0 134.355 0.238889 133.685 0.686453C133.015 1.13402 132.493 1.77015 132.185 2.51442C131.877 3.25869 131.796 4.07767 131.953 4.86778C132.11 5.6579 132.498 6.38367 133.068 6.95331C133.638 7.52295 134.363 7.91088 135.153 8.06805C135.944 8.22521 136.762 8.14454 137.507 7.83625C138.251 7.52796 138.887 7.0059 139.335 6.33608C139.782 5.66625 140.021 4.87875 140.021 4.07315C140.021 2.99289 139.592 1.95686 138.828 1.193C138.064 0.429133 137.028 0 135.948 0Z"
        fill="var(--text-color)"
      />
      <path
        d="M127.917 27.6438C127.301 27.0352 126.575 26.5489 125.778 26.2108C124.958 25.8664 124.077 25.689 123.188 25.689C122.298 25.689 121.418 25.8664 120.598 26.2108C119.808 26.5416 119.094 27.0291 118.499 27.6438C117.891 28.2506 117.404 28.968 117.066 29.7574C116.719 30.5768 116.54 31.4575 116.539 32.3474V39.0232H123.188C124.074 39.0206 124.952 38.8378 125.765 38.4858C126.565 38.1483 127.292 37.6579 127.904 37.0421C128.522 36.4321 129.013 35.7051 129.348 34.9034C129.692 34.0833 129.869 33.2028 129.869 32.3134C129.869 31.424 129.692 30.5435 129.348 29.7233C129.004 28.9441 128.518 28.2359 127.915 27.6348"
        fill="var(--dot-color)"
      />
      <path
        d="M139.362 10.6055H132.52V38.8918H139.362V10.6055Z"
        fill="var(--text-color)"
      />
      <path
        d="M157.559 10.609C155.673 10.6018 153.805 10.9791 152.069 11.7177C150.384 12.4332 148.85 13.4609 147.547 14.7466C146.254 16.0225 145.22 17.5364 144.502 19.2049C143.756 20.9471 143.378 22.8248 143.393 24.7199V38.8954H150.366V24.7199C150.352 23.2998 150.762 21.9078 151.545 20.723C152.328 19.5381 153.448 18.6145 154.76 18.0711C155.644 17.6964 156.596 17.508 157.556 17.5176H158.072C159.903 17.5176 161.66 16.7899 162.956 15.4946C164.251 14.1994 164.979 12.4426 164.979 10.6108H157.57L157.559 10.609Z"
        fill="var(--text-color)"
      />
    </svg>
  );
}