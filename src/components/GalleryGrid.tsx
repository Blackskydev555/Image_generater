import React from "react";
import type { GeneratedAsset } from "../api/aiClient";

type GalleryGridProps = {
  items: GeneratedAsset[];
  isGenerating: boolean;
};

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  isGenerating
}) => {
  if (!items.length) {
    return (
      <div className="card empty-card">
        <p className="empty-title">Nothing generated yet</p>
        <p className="empty-subtitle">
          Run a batch to see AI-generated outfits, cosplays, or looks appear
          here.
        </p>
      </div>
    );
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Generated content</h2>
        <p className="card-subtitle">
          Tap an item to preview. In a full product, this is where editing and
          scheduling would plug in.
        </p>
      </div>

      <div className="grid">
        {items.map((item) => (
          <article className="tile" key={item.id}>
            <div className="tile-image-wrapper">
              <img src={item.url} alt={item.prompt} className="tile-image" />
            </div>
            <div className="tile-body">
              <p className="tile-prompt">{item.prompt}</p>

              <div className="tile-meta">
                <span className="pill pill-muted">Draft</span>
                {isGenerating && (
                  <span className="pill pill-accent">More coming...</span>
                )}
              </div>

              <div className="tile-actions">
                <button className="button button-ghost" type="button">
                  Edit (future)
                </button>
                <button className="button button-ghost" type="button">
                  Schedule to TikTok (future)
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};



