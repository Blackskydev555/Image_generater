import React, { useState } from "react";
import { PromptBatchForm } from "./components/PromptBatchForm";
import { GalleryGrid } from "./components/GalleryGrid";
import { generateImages, type GeneratedAsset } from "./api/aiClient";

export const App: React.FC = () => {
  const [items, setItems] = useState<GeneratedAsset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompts: string[]) => {
    setIsGenerating(true);
    setError(null);
    try {
      const results = await generateImages({ prompts });
      setItems(results);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating content.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">AI Content Batch Generator</h1>
          <p className="app-subtitle">
            Enter a list of ideas (OOTD, cosplay looks, concepts) and generate
            visuals in one tap. Mobile-first demo.
          </p>
        </div>
      </header>

      <main className="app-main">
        <PromptBatchForm onGenerate={handleGenerate} isGenerating={isGenerating} />

        {error && <div className="alert alert-error">{error}</div>}

        <GalleryGrid items={items} isGenerating={isGenerating} />
      </main>

      <footer className="app-footer">
        <p>
          Built as a demo.{" "}
          <span className="footer-note">
            Future extensions: face fixes, color grading, and auto-posting to
            TikTok.
          </span>
        </p>
      </footer>
    </div>
  );
};



