import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    demoType: "video" | "url";
    demoUrl?: string | null;
    demoVideo?: string | null;
  } | null;
}

export function DemoModal({ open, onClose, product }: DemoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0a1628] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <h3 className="text-white font-bold text-lg">{product.name}</h3>
                <p className="text-white/40 text-sm mt-0.5">Live Demo</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {product.demoType === "video" && product.demoVideo ? (
                <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                  <video
                    src={product.demoVideo}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : product.demoType === "url" && product.demoUrl ? (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-xl overflow-hidden aspect-video border border-white/10">
                    <iframe
                      src={product.demoUrl}
                      title={`${product.name} Demo`}
                      className="w-full h-full"
                      allow="fullscreen"
                    />
                  </div>
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#00C2FF] text-sm hover:underline"
                  >
                    <ExternalLink size={14} />
                    Open in new tab
                  </a>
                </div>
              ) : (
                <div className="aspect-video flex flex-col items-center justify-center bg-[#0d1f3a] rounded-xl border border-white/5">
                  <div className="w-16 h-16 rounded-full bg-[#00C2FF]/10 flex items-center justify-center mb-4">
                    <ExternalLink className="text-[#00C2FF]" size={28} />
                  </div>
                  <p className="text-white/50 text-sm">Demo coming soon</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
