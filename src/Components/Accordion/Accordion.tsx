import React, { useState } from 'react';
import "./Accordion.scss"

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    console.log(question, answer);
  };

  return (
    <div className="accordion">
      <div onClick={toggleAccordion} className="accordion-header">
        <p className="question">{question}</p>
        <svg
          className={`icon text-gray-300 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
          />
        </svg>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
        {answer}
      </div>
    </div>
  );
};

export default Accordion;