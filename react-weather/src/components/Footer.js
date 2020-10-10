import React, { useRef, useEffect } from 'react';

import { TweenMax, Power3 } from 'gsap';

const Footer = () => {
  let footerWrapper = useRef(null);

  useEffect(() => {
    TweenMax.to(footerWrapper, 0.8, {
      opacity: 1,
      // y: 0,
      ease: Power3.easeOut,
      bottom: '0px',
      delay: 1,
    });
  });

  return (
    <div>
      <footer>
        <hr />
        <div
          className="footer-wrapper"
          ref={(el) => {
            footerWrapper = el;
          }}
        >
          <p>Weather app created by Nicholas Smith</p>
          <p>
            You can find the code for this project on Github{' '}
            <a
              href="https://github.com/njpsmith/react-weather"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </p>
          <p>
            Find me on LinkedIn{' '}
            <a
              href="https://www.linkedin.com/in/nicholas-smith-97a90829/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
