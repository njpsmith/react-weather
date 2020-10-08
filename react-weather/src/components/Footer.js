import React from 'react';

const Footer = () => {
  return (
    <footer>
      <hr />
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
    </footer>
  );
};

export default Footer;
