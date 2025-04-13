import React, { useEffect, useRef, useState } from 'react';
import { Tilt } from 'react-tilt';
import Typed from 'typed.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faInstagram, faGithub, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
interface IpLocation {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

function App() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState<IpLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ['dara'],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
        backDelay: 3000,
        showCursor: true,
        cursorChar: '|'
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  const getLocationByIP = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      const data = await response.json();
      setLocation(data);
      setShowLocation(true);
    } catch (err) {
      setError(`Erro ao obter localização: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
      getNavigatorLocation();
    } finally {
      setLoading(false);
    }
  };

  const getNavigatorLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            ip: 'Não disponível',
            city: 'Não disponível',
            region: 'Não disponível',
            country_name: 'Não disponível',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setShowLocation(true);
          setLoading(false);
        },
        (error) => {
          setError(`Erro ao obter localização: ${error.message}`);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocalização não é suportada pelo seu navegador");
      setLoading(false);
    }
  };

  const closeLocationModal = () => {
    setShowLocation(false);
  };

  const defaultOptions = {
    reverse: false,
    max: 25,
    perspective: 1000,
    scale: 1.03,
    speed: 1200,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    transitionEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionSpeed: 1000,
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1),rgba(0,0,0,1))]"></div>
      
      <Tilt options={defaultOptions} className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-xl overflow-hidden relative z-10">
          <div className="p-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img 
                src="https://i.postimg.cc/FKytzGFM/a39ab8ebb28156463bcaea53d7a0aa47.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              <span ref={typedRef}></span>
            </h1>
            
            <div className="bg-zinc-800 rounded-full px-4 py-1 flex items-center mb-6">
              <FontAwesomeIcon icon={faCode } className="text-blue-400 mr-2" />
              <span className="text-gray-300 text-sm">xitado by pecinha</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 w-full mb-6">
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg p-3"
              >
                <FontAwesomeIcon icon={faDiscord} className="text-indigo-400 mr-2" />
                <span className="text-gray-300 text-sm">discord</span>
              </a>
              
              <a 
                href="https://www.paypal.com/br/" 
                className="flex items-center bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg p-3"
              >
                <FontAwesomeIcon icon={faPaypal} className="text-blue-400 mr-2" />
                <span className="text-gray-300 text-sm">paypal</span>
              </a>
              
              <a 
                href="https://www.instagram.com/jairmessiasbolsonaro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg p-3"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-pink-400 mr-2" />
                <span className="text-gray-300 text-sm">instagram</span>
              </a>
              
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg p-3"
              >
                <FontAwesomeIcon icon={faGithub} className="text-gray-400 mr-2" />
                <span className="text-gray-300 text-sm">github</span>
              </a>
            </div>
            
            <button 
              onClick={getLocationByIP}
              disabled={loading}
              className="max-w-xs mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all text-sm"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  Não clique aqui
                </>
              )}
            </button>
            
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>
      </Tilt>
      
      <AnimatePresence>
        {showLocation && location && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCode} className="text-green-500 mr-2" />
                  <h3 className="text-white font-medium">Location</h3>
                </div>
                <button 
                  onClick={closeLocationModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              
              <div className="p-4 bg-zinc-950 font-mono text-sm">
                <TypewriterEffect text={[
                  { text: "> Iniciando rastreamento de localização...", delay: 30 },
                  { text: "> Conectando aos satélites...", delay: 30 },
                  { text: "> Acesso concedido!", delay: 30 },
                  { text: `> IP: ${location.ip || 'Não disponível'}`, delay: 20 },
                  { text: `> Cidade: ${location.city || 'Não disponível'}`, delay: 20 },
                  { text: `> Região: ${location.region || 'Não disponível'}`, delay: 20 },
                  { text: `> País: ${location.country_name || 'Não disponível'}`, delay: 20 },
                  { text: `> Latitude: ${location.latitude}`, delay: 20 },
                  { text: `> Longitude: ${location.longitude}`, delay: 20 },
                  { text: "> Localização obtida com sucesso.", delay: 30 },
                  { text: "> Abrindo mapa...", delay: 30 },
                ]} />
                
                <div className="mt-4">
                  <a 
                    href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center"
                  >
                    <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-1" />
                    Ver no Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente para efeito de digitação no console
const TypewriterEffect = ({ text }: { text: Array<{ text: string, delay: number }> }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  
  useEffect(() => {
    if (currentLine >= text.length) return;
    
    const line = text[currentLine].text;
    const delay = text[currentLine].delay;
    
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLine]) {
            newLines[currentLine] = line.substring(0, currentChar + 1);
          } else {
            newLines[currentLine] = line.substring(0, currentChar + 1);
          }
          return newLines;
        });
        setCurrentChar(currentChar + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, text]);
  
  return (
    <div className="text-green-500">
      {displayedLines.map((line, index) => (
        <div key={index} className="mb-1">
          {line}
          {index === currentLine && currentChar < text[currentLine]?.text.length && (
            <span className="animate-pulse">▋</span>
          )}
        </div>
      ))}
      {currentLine < text.length && currentChar === 0 && (
        <div className="mb-1">
          <span className="animate-pulse">▋</span>
        </div>
      )}
    </div>
  );
};

export default App;