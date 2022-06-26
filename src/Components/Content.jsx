import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Content() {
  const ref = useRef();

  return (
    <div ref={ref} className="content">
      <section id="heroSection">
        <div id="nav">
          <p>Mariusz Wnęk</p>
          <ul>
            <li class="wip">Work</li>
            <li class="wip">Lab</li>
            <li class="wip">Learn</li>
            <li class="wip">About</li>
            <li>
              <a href="mailto:wnek.mariusz@gmail.com">Contact</a>
            </li>
          </ul>
        </div>
        <h1>
          Interactive
          <br />
          Designer
        </h1>
      </section>
      <section id="second">
        <div class="wrapper">
          <h3>
            My name is Mariusz Wnęk, but everybody calls me Mariusz. I'm
            interactive designer from Kraków, Poland. Currently working to make
            the web more immersive at&nbsp;
            <a href="https://www.theatrejs.com/" targe="_blank">
              Theatre.js
            </a>
            <br />
            <br />
            Previously lead designer at{' '}
            <a href="https://wild.as/" target="_blank">
              Wild
            </a>{' '}
            and freelance interactive designer at{' '}
            <a href="https://activetheory.net" target="_blank">
              Active Theory
            </a>
          </h3>
          <div class="clients">
            <p>I had the pleasure to work with:</p>
            <ul>
              <li>Adidas</li>
              <li>GoPro</li>
              <li>Pinkbike</li>
              <li>Reb Bull</li>
              <li>Volkswagen</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="third">
        <div class="wrapper">
          <h2>
            Don't be <br />a stranger
          </h2>
          <a href="mailto:wnek.mariusz@gmail.com">Say hi!</a>
        </div>
        <div id="footer">
          <ul>
            <li>
              <a href="https://twitter.com/mariuszwnek" target="_blank">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://github.com/wnek" target="_blank">
                Github
              </a>
            </li>
            <li>
              <a href="https://dribbble.com/wnek" target="_blank">
                Dribbble
              </a>
            </li>
          </ul>
          <p>©2022</p>
        </div>
      </section>
    </div>
  );
}

export default Content;
