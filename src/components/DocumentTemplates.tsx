import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Check, Copy, Download, Edit3, Eye, FileSignature, AlertCircle, Bookmark } from 'lucide-react';
import { LegalDocument } from '../types';
import { MOCK_DOCUMENTS } from '../mockData';

interface DocumentTemplatesProps {
  onBackToHome: () => void;
}

export default function DocumentTemplates({ onBackToHome }: DocumentTemplatesProps) {
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Interactive copy/download status states
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [stamped, setStamped] = useState(false);

  const categories = ['All', 'Contract', 'Lawsuit'];

  // Initialize form fields when a document is selected
  useEffect(() => {
    if (selectedDoc) {
      const initialValues: Record<string, string> = {};
      selectedDoc.fields.forEach((field) => {
        initialValues[field.key] = field.defaultValue;
      });
      setFieldValues(initialValues);
      setStamped(false);
      setActiveTab('edit');
    }
  }, [selectedDoc]);

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  // Helper to compile the template by substituting placeholders
  const getCompiledDocumentText = () => {
    if (!selectedDoc) return '';
    let text = selectedDoc.templateText;
    Object.entries(fieldValues).forEach(([key, val]) => {
      // Replace placeholders like {{partyA}}
      const regex = new RegExp(`{{${key}}}`, 'g');
      text = text.replace(regex, val || `[${key.toUpperCase()}]`);
    });
    return text;
  };

  const handleCopy = () => {
    const text = getCompiledDocumentText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setStamped(true);
      setDownloading(false);
    }, 1500);
  };

  const filteredDocs = MOCK_DOCUMENTS.filter((doc) => {
    return selectedCategory === 'All' || doc.category === selectedCategory;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans" id="document-templates-container">
      {/* Header */}
      <div className="bg-[#0B1B3D] text-white px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <button 
            onClick={selectedDoc ? () => setSelectedDoc(null) : onBackToHome}
            className="p-1 hover:bg-slate-800 rounded-full transition-colors"
            id="doc-back-button"
          >
            <ArrowLeft className="w-5 h-5 text-amber-400" />
          </button>
          <div>
            <h1 className="text-base font-bold tracking-tight">
              {selectedDoc ? 'Document Editor' : 'Legal Templates'}
            </h1>
            <p className="text-[10px] text-amber-300 font-mono">
              {selectedDoc ? 'កែសម្រួលឯកសារ' : 'គំរូឯកសារគតិយុត្ត'}
            </p>
          </div>
        </div>
        <span className="bg-red-600 text-white text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase">
          Bilingual
        </span>
      </div>

      {selectedDoc ? (
        /* Edit and Preview Interface */
        <div className="flex-1 flex flex-col min-h-0 relative">
          {/* Tabs for switching between Input Form and Live Preview */}
          <div className="bg-white border-b border-slate-200 shrink-0 flex">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 border-b-2 transition-all ${
                activeTab === 'edit'
                  ? 'border-red-600 text-[#0B1B3D]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Fill Fields / បំពេញព័ត៌មាន</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 border-b-2 transition-all ${
                activeTab === 'preview'
                  ? 'border-red-600 text-[#0B1B3D]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live / មើលគំរូផ្ទាល់</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'edit' ? (
              /* Input Form Fields */
              <div className="space-y-4" id="form-tab-content">
                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-1">
                  <h3 className="text-xs font-bold text-[#0B1B3D]">{selectedDoc.title}</h3>
                  <p className="text-[10px] text-slate-500">{selectedDoc.description}</p>
                  <p className="text-[10px] text-slate-400 italic">{selectedDoc.descriptionKh}</p>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
                  <h4 className="text-[11px] font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center">
                    <FileSignature className="w-4 h-4 text-red-600 mr-1.5" />
                    Fill Information / បំពេញព័ត៌មានកិច្ចសន្យា
                  </h4>
                  
                  {selectedDoc.fields.map((field) => (
                    <div key={field.key} className="space-y-1">
                      <div className="flex justify-between">
                        <label className="text-[10px] font-bold text-slate-600">{field.label}</label>
                        <span className="text-[9px] text-red-600 font-semibold">{field.labelKh}</span>
                      </div>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={fieldValues[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[10px] text-amber-900 space-y-1.5">
                  <p className="font-bold flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 mr-1 shrink-0" />
                    Bilingual Compliance Disclaimer
                  </p>
                  <p>This draft conforms to the Civil Code of Cambodia (2007) standards. Custom fields entered will render in both English and Khmer lines appropriately.</p>
                </div>

                <button
                  onClick={() => setActiveTab('preview')}
                  className="w-full bg-[#0B1B3D] hover:bg-slate-900 text-white rounded-xl py-3 text-xs font-bold shadow transition flex items-center justify-center space-x-1.5"
                >
                  <span>Review Document / ពិនិត្យមើលគំរូ</span>
                </button>
              </div>
            ) : (
              /* Compiled Document Preview */
              <div className="space-y-4" id="preview-tab-content">
                {/* Actions Toolbar */}
                <div className="flex space-x-2 shrink-0">
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl py-2.5 text-xs font-semibold shadow-sm flex items-center justify-center space-x-1.5 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy / ចម្លង</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2.5 text-xs font-semibold shadow-sm flex items-center justify-center space-x-1.5 transition disabled:opacity-50"
                  >
                    {downloading ? (
                      <span className="animate-pulse">Sealing...</span>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-amber-300" />
                        <span>Download / ទាញយក</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulated Document Canvas */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md relative min-h-[400px] overflow-hidden select-text text-slate-800 text-left font-serif text-xs leading-relaxed space-y-4">
                  
                  {/* Official Gold Border Top Ribbon */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-600 to-[#0B1B3D]"></div>

                  {/* Watermark Logo Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                    <div className="border-8 border-[#0B1B3D] rounded-full p-16 text-center transform -rotate-12">
                      <h2 className="text-4xl font-extrabold tracking-wider">KHMER LAW HUB</h2>
                      <p className="text-lg font-bold">ក្រសួងយុត្តិធម៌</p>
                    </div>
                  </div>

                  {/* Official Legal Seal Stamp if Downloaded */}
                  {stamped && (
                    <div className="absolute bottom-16 right-8 w-24 h-24 border-4 border-red-600/70 rounded-full flex flex-col items-center justify-center p-1 transform rotate-6 select-none animate-bounce pointer-events-none">
                      <div className="border-2 border-dashed border-red-600/70 rounded-full w-full h-full flex flex-col items-center justify-center">
                        <span className="text-[7px] font-bold text-red-600/70 tracking-widest leading-none">APPROVED</span>
                        <span className="text-[9px] font-extrabold text-red-600/80 leading-none my-0.5">ច្បាប់កម្ពុជា</span>
                        <span className="text-[6px] text-red-600/70 font-mono tracking-tighter">LAW HUB HUB</span>
                      </div>
                    </div>
                  )}

                  {/* Render Compiled Markdown Content */}
                  <div className="whitespace-pre-wrap font-sans text-[11px] text-slate-700 leading-relaxed space-y-3">
                    {getCompiledDocumentText().split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('###')) {
                        return <h3 key={index} className="text-sm font-bold text-[#0B1B3D] mt-4 mb-2">{paragraph.replace('###', '').trim()}</h3>;
                      }
                      if (paragraph.startsWith('####')) {
                        return <h4 key={index} className="text-xs font-bold text-red-600 mt-3 mb-1">{paragraph.replace('####', '').trim()}</h4>;
                      }
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return <p key={index} className="font-bold text-slate-800">{paragraph.replace(/\*\*/g, '')}</p>;
                      }
                      if (paragraph.trim() === '---') {
                        return <hr key={index} className="border-t border-slate-200 my-4" />;
                      }
                      return <p key={index} className="mb-2 text-slate-600 leading-relaxed">{paragraph}</p>;
                    })}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center italic">
                  Scroll inside the preview canvas to read the entire document.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Document Selection List View */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Horizontal Category Pill Tabs */}
          <div className="bg-white p-3 shadow-sm border-b border-slate-200 flex space-x-1.5 overflow-x-auto shrink-0" id="doc-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#0B1B3D] text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'All categories / ទាំងអស់' : cat}
              </button>
            ))}
          </div>

          {/* Templates Feed list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3" id="doc-list-scroll">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:border-[#0B1B3D] hover:shadow-md transition cursor-pointer flex items-start space-x-3.5 group"
              >
                <div className="bg-amber-50 group-hover:bg-amber-100 rounded-lg p-2.5 text-amber-600 transition shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-[#0B1B3D] group-hover:text-red-600 transition-colors truncate">
                      {doc.title}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5">{doc.titleKh}</p>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-normal">{doc.description}</p>
                  
                  <div className="flex items-center space-x-2 mt-2.5 pt-2 border-t border-slate-50 text-[9px] text-slate-400">
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      {doc.fields.length} Fields
                    </span>
                    <span className="flex items-center">
                      <Bookmark className="w-3 h-3 text-red-500 mr-0.5" />
                      Cambodian Civil Code (2007)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
