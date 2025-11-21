import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Image as ImageIcon, Download, Wand2, AlertCircle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

// Define a local interface for the expected AIStudio object structure
interface AIStudioClient {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

const ImageGenerator: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper to safely access window.aistudio
  const getAIStudio = (): AIStudioClient | undefined => {
    return (window as any).aistudio;
  };

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    const aiStudio = getAIStudio();
    if (aiStudio) {
      try {
        const hasKey = await aiStudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } catch (e) {
        console.error("Error checking API key:", e);
      }
    }
  };

  const handleSelectKey = async () => {
    const aiStudio = getAIStudio();
    if (aiStudio) {
      try {
        await aiStudio.openSelectKey();
        await checkApiKey();
      } catch (e) {
        console.error("Error selecting API key:", e);
      }
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
        // Create a new instance every time to ensure latest key is used (per instructions)
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                imageConfig: {
                    imageSize: size,
                    aspectRatio: "1:1"
                }
            },
        });

        let found = false;
        if (response.candidates && response.candidates[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
             // Check if there is text content explaining why
             const textPart = response.candidates?.[0]?.content?.parts?.find(p => p.text);
             if (textPart) {
                 setError(textPart.text || "Erro desconhecido.");
             } else {
                 setError("Não foi possível gerar a imagem. Tente novamente.");
             }
        }

    } catch (err: any) {
        console.error(err);
        setError(err.message || "Falha na geração da imagem.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-white" />
                </div>
                Gerador de Imagens
            </h1>
            <p className="text-muted">Crie imagens exclusivas para suas miniaturas e avatares usando o Gemini 3 Pro.</p>
        </div>

        {!hasApiKey ? (
            <Card className="p-12 text-center border-primary/20 bg-primary/5 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">API Key Necessária</h3>
                <p className="text-muted mb-8 max-w-md mx-auto">
                    Para utilizar o gerador de imagens de alta qualidade (Gemini 3 Pro), 
                    é necessário conectar sua chave de API do Google AI Studio.
                </p>
                <Button onClick={handleSelectKey} size="lg">Conectar API Key</Button>
            </Card>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8">
                <div className="space-y-6">
                    <Card className="p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted">Prompt da Imagem</label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Descreva detalhadamente a imagem que você deseja criar. Ex: Um astronauta estilo cyberpunk bebendo café em uma cafeteria neon em Tóquio..."
                                    className="w-full h-40 bg-background/50 border border-accent rounded-xl p-4 resize-none focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-lg placeholder:text-muted/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3 text-muted">Qualidade da Imagem</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {(['1K', '2K', '4K'] as const).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`
                                                relative py-3 px-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-1
                                                ${size === s 
                                                ? 'bg-primary/10 border-primary text-primary' 
                                                : 'bg-background border-accent text-muted hover:border-muted hover:bg-accent/5'}
                                            `}
                                        >
                                            <span className="font-bold text-lg">{s}</span>
                                            <span className="text-[10px] uppercase tracking-wider opacity-70">Resolução</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button 
                                onClick={handleGenerate} 
                                isLoading={loading} 
                                disabled={!prompt.trim()} 
                                className="w-full h-14 text-lg shadow-lg shadow-primary/20"
                                icon={<Wand2 className="w-5 h-5" />}
                            >
                                {loading ? 'Criando Mágica...' : 'Gerar Imagem'}
                            </Button>
                            
                            {error && (
                                <div className="p-4 rounded-lg bg-error/10 border border-error/20 text-error text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">Ops! Algo deu errado.</p>
                                        <p>{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="p-1.5 bg-gradient-to-br from-accent to-background border-accent h-full min-h-[450px] flex flex-col">
                        <div className="flex-1 rounded-lg bg-black/60 overflow-hidden relative group flex items-center justify-center border border-white/5">
                             {/* Grid pattern for transparency */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                                 style={{backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
                            </div>

                            {generatedImage ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <img src={generatedImage} alt="Gerada por IA" className="max-w-full max-h-full object-contain shadow-2xl" />
                                    
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm p-6">
                                        <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-white font-bold text-xl mb-1">Imagem Pronta!</h3>
                                            <p className="text-white/70 text-sm mb-6">Resolução: {size}</p>
                                            
                                            <a href={generatedImage} download={`reactor-studio-${size}-${Date.now()}.png`}>
                                                <Button size="lg" className="min-w-[200px]" icon={<Download className="w-5 h-5" />}>
                                                    Baixar PNG
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-8 max-w-sm">
                                    {loading ? (
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                                                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Wand2 className="w-6 h-6 text-primary animate-pulse" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-lg font-medium text-white">Gerando Imagem...</p>
                                                <p className="text-sm text-muted">Isso pode levar alguns segundos.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="opacity-40 flex flex-col items-center gap-4">
                                            <ImageIcon className="w-20 h-20" />
                                            <p className="text-lg font-medium">Sua imagem aparecerá aqui</p>
                                            <p className="text-sm">Preencha o prompt e clique em gerar para visualizar o resultado.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        )}
      </div>
    </Layout>
  );
};

export default ImageGenerator;