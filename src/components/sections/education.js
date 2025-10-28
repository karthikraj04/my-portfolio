import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import indiaMap from '../../images/india-map.svg';

const StyledEducationSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;

  .tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;

    button {
      background: none;
      border: 2px solid var(--green);
      color: var(--green);
      padding: 0.6rem 1.3rem;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: var(--green-tint);
        color: var(--white);
      }

      &:hover {
        background: var(--green-tint);
      }
    }
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .map-container {
    position: relative;
    width: 45%;
    @media (max-width: 768px) {
      width: 80%;
    }
  }

  .india-map {
    width: 100%;
    opacity: 0.9;
  }

  .marker {
    position: absolute;
    transform: translate(-50%, -50%);
    color: var(--green);
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    font-weight: 600;
    background-color: rgba(100, 255, 218, 0.1);
    padding: 5px 8px;
    border-radius: 6px;
    transition: all 0.6s ease;
  }

  .education-details {
    width: 50%;
    text-align: left;

    h3 {
      color: var(--green);
      font-size: var(--fz-xl);
      margin-bottom: 5px;
    }

    p {
      color: var(--light-slate);
      margin-bottom: 8px;
    }

    ul {
      ${({ theme }) => theme.mixins.fancyList};
    }
  }
`;

const Education = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState('pg');

  useEffect(() => {
    if (prefersReducedMotion) {return;}
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const educationData = {
    school: {
      title: 'Higher Secondary Education',
      institution: 'Vidyodaya School',
      location: 'Ernakulam, Kerala',
      year: 'Completed May 2020',
      marker: { top: '90%', left: '40%' }, // Ernakulam
      details: ['PCMC stream (Physics, Chemistry, Mathematics, Computer Science)'],
    },
    ug: {
      title: 'Bachelor of Science (Computer Science, Mathematics, Statistics)',
      institution: 'St. Joseph’s College (Autonomous)',
      location: 'Bangalore, Karnataka',
      year: 'Aug 2020 – May 2023',
      marker: { top: '80%', left: '44%' }, // Bangalore
      details: [],
    },
    pg: {
      title: 'M.Sc. Data Science and Spatial Analytics',
      institution: 'Symbiosis Institute of Geoinformatics',
      location: 'Pune, Maharashtra',
      year: 'Jul 2024 – Present',
      marker: { top: '64%', left: '26%' }, // Pune
      details: ['Specialization in Artificial Intelligence and Spatial Analytics.'],
    },
  };

  const activeEdu = educationData[activeTab];

  return (
    <StyledEducationSection id="education" ref={revealContainer}>
      <h2>Education Journey</h2>

      {/* Tab Buttons */}
      <div className="tabs">
        <button
          className={activeTab === 'school' ? 'active' : ''}
          onClick={() => setActiveTab('school')}>
          School
        </button>
        <button className={activeTab === 'ug' ? 'active' : ''} onClick={() => setActiveTab('ug')}>
          Undergraduate
        </button>
        <button className={activeTab === 'pg' ? 'active' : ''} onClick={() => setActiveTab('pg')}>
          Postgraduate
        </button>
      </div>

      {/* Map and Details */}
      <div className="inner">
        <div className="map-container">
          <img src={indiaMap} alt="India Map" className="india-map" />
          <div
            className="marker"
            style={{
              top: activeEdu.marker.top,
              left: activeEdu.marker.left,
            }}>
            🎓 {activeEdu.location.split(',')[0]}
          </div>
        </div>

        <div className="education-details">
          <h3>{activeEdu.title}</h3>
          <p>{activeEdu.institution}</p>
          <p>{activeEdu.location}</p>
          <p>{activeEdu.year}</p>
          <ul>
            {activeEdu.details.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </StyledEducationSection>
  );
};

export default Education;
