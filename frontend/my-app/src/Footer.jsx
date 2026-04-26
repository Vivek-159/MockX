import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className=" text-black py-8 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">MockUp X</h3>
            <p className="">
              Helping candidates ace their interviews with comprehensive preparation resources and practice tools.
            </p>
          </div>
          
         
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/practice" className="transition">Practice Interviews</a></li>
              <li><a href="/resources" className="transition">Resources</a></li>
              <li><a href="/pricing" className="transition">Pricing</a></li>
              <li><a href="/blog" className="transition">Blog</a></li>
            </ul>
          </div>
          
       
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/technical" className="transition">Technical Interviews</a></li>
              <li><a href="/behavioral" className="transition">Behavioral Questions</a></li>
              <li><a href="/resume" className="transition">Resume Builder</a></li>
              <li><a href="/community" className="transition">Community</a></li>
            </ul>
          </div>
          
        
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className=" mb-4">Have questions? Reach out to our team.</p>
            <div className="flex space-x-4">
              <a href="https://github.com" className=" transition">
                <FaGithub size={24} />
              </a>
              <a href="https://twitter.com" className=" transition">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className=" transition">
                <FaLinkedin size={24} />
              </a>
              <a href="mailto:contact@interviewprep.com" className=" transition">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>
        
       
      </div>
    </footer>
  );
};

export default Footer;