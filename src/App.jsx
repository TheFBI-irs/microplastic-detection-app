import { useState, useCallback } from 'react';
import Header from './components/Header';
import IntroTab from './components/IntroTab';
import ScanTab from './components/ScanTab';
import ScienceTab from './components/ScienceTab';
import ModelTab from './components/ModelTab';
import AboutTab from './components/AboutTab';
import Footer from './components/Footer';
import { fileToBase64 } from './utils/imageUtils';
import { runInference } from './utils/roboflowInference';

export default function App() {
  const [activeTab, setActiveTab] = useState('intro');

  // Scan state
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confidence, setConfidence] = useState(0.35);
  const [sampleVolumeML, setSampleVolumeML] = useState(10);

  const apiKeyMissing =
    !import.meta.env.VITE_ROBOFLOW_API_KEY ||
    import.meta.env.VITE_ROBOFLOW_API_KEY === 'your_key_here';

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleImageSelect = useCallback((file) => {
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
    setPredictions(null);
    setError(null);
  }, []);

  const handleImageClear = useCallback(() => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImage(null);
    setImageUrl(null);
    setPredictions(null);
    setError(null);
  }, [imageUrl]);

  const handleAnalyze = useCallback(async () => {
    if (!image) return;
    setIsLoading(true);
    setError(null);
    setPredictions(null);
    try {
      const base64 = await fileToBase64(image);
      const preds = await runInference(base64, confidence);
      setPredictions(preds);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [image, confidence]);

  const handleReset = useCallback(() => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImage(null);
    setImageUrl(null);
    setPredictions(null);
    setError(null);
    setSampleVolumeML(10);
  }, [imageUrl]);

  const renderTab = () => {
    switch (activeTab) {
      case 'intro':
        return <IntroTab onNavigate={handleTabChange} />;
      case 'scan':
        return (
          <ScanTab
            image={image}
            imageUrl={imageUrl}
            onImageSelect={handleImageSelect}
            onImageClear={handleImageClear}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            confidence={confidence}
            onConfidenceChange={setConfidence}
            error={error}
            predictions={predictions}
            onReset={handleReset}
            sampleVolumeML={sampleVolumeML}
            onSampleVolumeChange={setSampleVolumeML}
          />
        );
      case 'science':
        return <ScienceTab />;
      case 'model':
        return <ModelTab />;
      case 'about':
        return <AboutTab />;
      default:
        return <IntroTab onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Spacer for fixed header (logo row + tab row) */}
      <div className="h-[6.5rem]" />

      {/* API key warning */}
      {apiKeyMissing && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-3">
          <p className="text-amber-400 text-sm text-center">
            ⚠️ API key not configured. Add{' '}
            <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-300">
              VITE_ROBOFLOW_API_KEY
            </code>{' '}
            to your{' '}
            <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-300">
              .env
            </code>{' '}
            file.
          </p>
        </div>
      )}

      <main className="flex-1">
        {renderTab()}
      </main>

      <Footer />
    </div>
  );
}
