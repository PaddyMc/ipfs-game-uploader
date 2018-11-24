
import React, { Component } from 'react';
import './ParticlesBackground.css';
import ParticleAnimation from 'react-particle-animation'

class ParticlesBackground extends Component {
  render() { 
    return (
      <div className="">
          <ParticleAnimation className="particles"
            numParticles={300}
            interactive={false}
            color={{ r: 100, g: 100, b: 100, a: 100 }}
            background={{ r: 255, g: 255, b: 255, a: 255 }}
          />
      </div>
    );
  } 
}
export default ParticlesBackground;