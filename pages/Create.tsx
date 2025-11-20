import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, User as UserIcon, Settings2, CheckCircle, ChevronRight, ChevronLeft, FileVideo } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PRESET_AVATARS } from '../constants';
import { ReactionConfig } from '../types';

const steps = [
  { id: 1, title: 'Upload Video', icon: Upload },
  { id: 2, title: 'Choose Avatar', icon: UserIcon },
  { id: 3, title: 'Customize', icon: Settings2 },
  { id: 4, title: 'Review', icon: CheckCircle },
];

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<ReactionConfig>({
    videoFile: null,
    avatarId: '',
    style: 'quick',
    voice: 'female',
    position: 'top-right',
    size: 25,
  });

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
    else {
        // Submit
        navigate('/processing/new-job-123');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setConfig({ ...config, videoFile: e.target.files[0] });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 h-0.5 bg-accent w-full -z-10" />
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-col items-center bg-background px-2">
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                      ${isCompleted || isCurrent ? 'bg-primary border-primary text-white' : 'bg-card border-accent text-muted'}
                    `}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium mt-2 ${isCurrent ? 'text-primary' : 'text-muted'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Upload */}
              {currentStep === 1 && (
                <Card className="p-8 text-center border-dashed border-2 border-accent bg-card/50">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Upload your video</h3>
                    <p className="text-muted mb-8 max-w-sm">Drag and drop your video file here, or click to browse. Supports MP4, MOV (Max 100MB).</p>
                    
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      id="video-upload"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="video-upload">
                      <Button 
                        as="span" 
                        variant="secondary" 
                        size="lg" 
                        className="cursor-pointer"
                      >
                        Select File
                      </Button>
                    </label>

                    {config.videoFile && (
                      <div className="mt-8 p-4 bg-background rounded-lg border border-accent flex items-center gap-3 w-full max-w-md">
                         <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                            <FileVideo className="w-5 h-5 text-primary" />
                         </div>
                         <div className="flex-1 text-left">
                            <p className="text-sm font-medium truncate">{config.videoFile.name}</p>
                            <p className="text-xs text-muted">{(config.videoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                         </div>
                         <button onClick={() => setConfig({...config, videoFile: null})} className="text-error hover:text-error/80">
                             ×
                         </button>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Step 2: Avatar */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Choose your AI Persona</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {PRESET_AVATARS.map((avatar) => (
                      <div 
                        key={avatar.id}
                        onClick={() => setConfig({ ...config, avatarId: avatar.id })}
                        className={`
                          relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 group
                          ${config.avatarId === avatar.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-accent'}
                        `}
                      >
                        <img src={avatar.previewUrl} alt={avatar.name} className="w-full aspect-square object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-8">
                          <p className="text-sm font-medium text-white">{avatar.name}</p>
                        </div>
                        {config.avatarId === avatar.id && (
                          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-accent" />
                    <span className="text-muted text-sm">OR</span>
                    <div className="flex-1 h-px bg-accent" />
                  </div>
                  
                  <div className="mt-4 text-center">
                     <Button variant="outline" icon={<Upload className="w-4 h-4"/>}>Upload Custom Photo</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Config */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Settings2 className="w-5 h-5 text-primary"/> Reaction Style
                    </h3>
                    <div className="space-y-3">
                        {[
                            { id: 'quick', label: '⚡ Quick Reaction', desc: 'Short, punchy comments' },
                            { id: 'analysis', label: '💬 Deep Analysis', desc: 'Detailed observations and thoughts' },
                            { id: 'comedy', label: '😂 Comedy Mode', desc: 'Funny, sarcastic commentary' },
                        ].map(opt => (
                            <div 
                                key={opt.id}
                                onClick={() => setConfig({ ...config, style: opt.id as any })}
                                className={`p-3 rounded-lg border cursor-pointer transition-colors ${config.style === opt.id ? 'bg-primary/10 border-primary' : 'bg-background border-accent hover:border-muted'}`}
                            >
                                <div className="font-medium">{opt.label}</div>
                                <div className="text-xs text-muted">{opt.desc}</div>
                            </div>
                        ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Voice & Position</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium mb-2 block text-muted">AI Voice</label>
                            <select 
                                className="w-full bg-background border border-accent rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                value={config.voice}
                                onChange={(e) => setConfig({...config, voice: e.target.value as any})}
                            >
                                <option value="female">Rachel (Female, Energetic)</option>
                                <option value="male_deep">Marcus (Male, Deep)</option>
                                <option value="male_mid">Caleb (Male, Casual)</option>
                                <option value="neutral">Sam (Neutral)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block text-muted">Avatar Size: {config.size}%</label>
                            <input 
                                type="range" 
                                min="15" 
                                max="40" 
                                value={config.size} 
                                onChange={(e) => setConfig({...config, size: parseInt(e.target.value)})}
                                className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div>
                           <label className="text-sm font-medium mb-2 block text-muted">Position</label>
                           <div className="grid grid-cols-2 gap-2">
                               {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                                   <button
                                     key={pos}
                                     onClick={() => setConfig({...config, position: pos as any})}
                                     className={`p-2 text-xs border rounded ${config.position === pos ? 'bg-primary text-white border-primary' : 'border-accent text-muted'}`}
                                   >
                                     {pos.replace('-', ' ').toUpperCase()}
                                   </button>
                               ))}
                           </div>
                        </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                 <div className="max-w-2xl mx-auto">
                    <Card className="p-6 border-primary/30 bg-gradient-to-b from-card to-background">
                        <h3 className="text-2xl font-bold mb-6 text-center">Ready to generate?</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-3 border-b border-accent">
                                <span className="text-muted">Video</span>
                                <span className="font-medium">{config.videoFile?.name || "Sample_Video.mp4"}</span>
                            </div>
                             <div className="flex justify-between items-center py-3 border-b border-accent">
                                <span className="text-muted">Avatar</span>
                                <span className="font-medium">{PRESET_AVATARS.find(a => a.id === config.avatarId)?.name || "Not selected"}</span>
                            </div>
                             <div className="flex justify-between items-center py-3 border-b border-accent">
                                <span className="text-muted">Style</span>
                                <span className="capitalize font-medium">{config.style}</span>
                            </div>
                             <div className="flex justify-between items-center py-3 border-b border-accent">
                                <span className="text-muted">Voice</span>
                                <span className="capitalize font-medium">{config.voice}</span>
                            </div>
                        </div>

                        <div className="bg-accent/20 p-4 rounded-lg mb-6 text-xs text-muted text-center">
                            By clicking generate, you'll use 1 credit from your free plan. Estimated time: 2 minutes.
                        </div>
                    </Card>
                 </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex justify-between border-t border-accent pt-6">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            icon={<ChevronLeft className="w-4 h-4"/>}
          >
            Back
          </Button>
          
          <Button 
            variant={currentStep === 4 ? 'secondary' : 'primary'}
            onClick={handleNext}
            disabled={currentStep === 1 && !config.videoFile}
            className="min-w-[140px]"
          >
            {currentStep === 4 ? (
                <>
                 Generate <span className="ml-2">🚀</span>
                </>
            ) : (
                <>
                 Next <ChevronRight className="w-4 h-4 ml-1"/>
                </>
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Create;