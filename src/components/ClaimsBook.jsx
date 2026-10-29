import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNowPeruDateTime } from '../lib/dateUtils.js';

export default function ClaimsBook() {
  const [currentPeruDate, setCurrentPeruDate] = useState('');
  const [formData, setFormData] = useState({
    documentType: 'DNI',
    documentNumber: '',
    fullName: '',
    address: '',
    email: '',
    phone: '',
    goodsType: 'servicio',
    claimedAmount: '',
    goodsDescription: '',
    claimType: 'reclamo',
    incidentDate: '',
    details: '',
    request: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    setCurrentPeruDate(getNowPeruDateTime());
  }, []);

  const validateForm = () => {
    let newErrors = {};
    
    // Document Validation
    if (!formData.documentType) {
      newErrors.documentType = 'Selecciona un tipo de documento';
    }

    const doc = formData.documentNumber.trim();
    if (!doc) {
      newErrors.documentNumber = 'El número de documento es obligatorio';
    } else {
      if (formData.documentType === 'DNI' && !/^\d{8}$/.test(doc)) {
        newErrors.documentNumber = 'El DNI debe tener exactamente 8 números';
      } else if (formData.documentType === 'RUC' && !/^\d{11}$/.test(doc)) {
        newErrors.documentNumber = 'El RUC debe tener exactamente 11 números';
      } else if (doc.length < 5) {
        newErrors.documentNumber = 'Número de documento inválido';
      }
    }

    if (!formData.claimType) {
      newErrors.claimType = 'Selecciona el tipo de solicitud';
    }

    if (!formData.incidentDate) {
      newErrors.incidentDate = 'La fecha del incidente es obligatoria';
    }
    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo o razón social es obligatorio';
    if (!formData.address.trim()) newErrors.address = 'El domicilio es obligatorio';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.goodsType) {
      newErrors.goodsType = 'Selecciona el tipo de bien';
    }

    if (!formData.goodsDescription.trim()) {
      newErrors.goodsDescription = 'La descripción del bien es obligatoria';
    }

    if (formData.phone.trim() && !/^\+?\d{7,15}$/.test(formData.phone.trim().replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono debe contener entre 7 y 15 números';
    }

    if (!formData.details.trim()) newErrors.details = 'Por favor ingresa el detalle de tu caso';
    if (!formData.request.trim()) newErrors.request = 'Por favor especifica tu pedido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/claims', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          setSubmitError(data.error || 'Ocurrió un error al enviar el formulario.');
        }
      } catch (error) {
        setSubmitError('Error de conexión. Por favor, inténtalo más tarde.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  return (
    <section className="pt-6 pb-10 md:pt-8 md:pb-14 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-2.5 bg-slate-900 border border-slate-800 rounded-xl mb-3 shadow-lg">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-white">
              Libro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Reclamaciones</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed px-2 sm:px-0 max-w-xl mx-auto">
              Conforme a lo establecido en el Código de Protección y Defensa del Consumidor. Cuenta con nosotros para resolver cualquier inconveniente.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-7 relative shadow-2xl"
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">¡Formulario Enviado!</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
                Hemos registrado exitosamente tu {formData.claimType === 'queja' ? 'queja' : 'reclamo'}. Hemos enviado el cargo de confirmación a <strong>{formData.email}</strong> y a nuestra área legal (<strong>legal@alphasoftinnovation.com</strong>).
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Volver al inicio
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

              <div className="text-center mb-4 sm:mb-5 border-b border-slate-800 pb-4">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-white uppercase tracking-wider">Libro de Reclamaciones</h2>
                <h3 className="text-xs sm:text-sm text-slate-400 mt-0.5">Hoja de Reclamación</h3>
                <div className="mt-2.5 inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 text-[11px] sm:text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Fecha: {currentPeruDate || getNowPeruDateTime()}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>Alphasoft Innovation — RUC: 20612026387</span>
                </div>
              </div>
              
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 sm:p-5 space-y-3">
                <h4 className="text-white font-semibold text-xs sm:text-sm border-b border-slate-800 pb-2">1. Identificación del Consumidor Reclamante</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  
                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="fullName" className="block text-[11px] sm:text-xs font-medium text-slate-400">Nombres y Apellidos / Razón Social *</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                      placeholder="Ej. Juan Pérez / Empresa SAC"
                    />
                    {errors.fullName && <p className="text-red-400 text-[10px] mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="address" className="block text-[11px] sm:text-xs font-medium text-slate-400">Domicilio *</label>
                    <input 
                      type="text" 
                      id="address" 
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.address ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                      placeholder="Ej. Av. Javier Prado 123, San Isidro, Lima"
                    />
                    {errors.address && <p className="text-red-400 text-[10px] mt-0.5">{errors.address}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="documentType" className="block text-[11px] sm:text-xs font-medium text-slate-400">Tipo de Documento</label>
                    <select 
                      id="documentType" 
                      value={formData.documentType}
                      onChange={(e) => {
                        handleChange(e);
                        setFormData(prev => ({ ...prev, documentNumber: '' }));
                        setErrors(prev => ({ ...prev, documentNumber: null }));
                      }}
                      className={`w-full bg-slate-900 border ${errors.documentType ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-3.5 pr-9 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors cursor-pointer`}
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1em'
                      }}
                    >
                      <option value="" disabled>Selecciona una opción...</option>
                      <option value="DNI">DNI</option>
                      <option value="CE">Carné de Extranjería</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="RUC">RUC</option>
                    </select>
                    {errors.documentType && <p className="text-red-400 text-[10px] mt-0.5">{errors.documentType}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="documentNumber" className="block text-[11px] sm:text-xs font-medium text-slate-400">Número de Documento *</label>
                    <input 
                      type="text" 
                      id="documentNumber" 
                      value={formData.documentNumber}
                      onChange={handleChange}
                      onBlur={() => {
                        const doc = formData.documentNumber.trim();
                        let error = null;
                        if (doc) {
                          if (formData.documentType === 'DNI' && !/^\d{8}$/.test(doc)) {
                            error = 'El DNI debe tener exactamente 8 números';
                          } else if (formData.documentType === 'RUC' && !/^\d{11}$/.test(doc)) {
                            error = 'El RUC debe tener exactamente 11 números';
                          } else if (doc.length < 5) {
                            error = 'Número de documento inválido';
                          }
                        }
                        if (error) {
                          setErrors(prev => ({ ...prev, documentNumber: error }));
                        }
                      }}
                      className={`w-full bg-slate-900 border ${errors.documentNumber ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                      placeholder={formData.documentType === 'DNI' ? 'Ej. 74839210' : formData.documentType === 'RUC' ? 'Ej. 20123456789' : 'Ej. 74839210'}
                      maxLength={formData.documentType === 'DNI' ? 8 : formData.documentType === 'RUC' ? 11 : 15}
                    />
                    {errors.documentNumber && <p className="text-red-400 text-[10px] mt-0.5">{errors.documentNumber}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-[11px] sm:text-xs font-medium text-slate-400">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                      placeholder="ejemplo@correo.com"
                    />
                    {errors.email && <p className="text-red-400 text-[10px] mt-0.5">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-[11px] sm:text-xs font-medium text-slate-400">Teléfono (Opcional)</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                      placeholder="Ej. 987654321"
                    />
                    {errors.phone && <p className="text-red-400 text-[10px] mt-0.5">{errors.phone}</p>}
                  </div>

                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 sm:p-5 space-y-3">
                <h4 className="text-white font-semibold text-xs sm:text-sm border-b border-slate-800 pb-2">2. Identificación del Bien Contratado</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-400">Tipo de Bien *</label>
                    <div className="flex flex-row items-center gap-5 pt-1.5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs">
                        <input type="radio" name="goodsType" id="producto" value="producto" checked={formData.goodsType === 'producto'} onChange={(e) => setFormData(prev => ({...prev, goodsType: e.target.value}))} className="w-3.5 h-3.5 text-orange-500 focus:ring-orange-500 bg-slate-900 border-slate-700" />
                        <span className="text-slate-300 text-xs">Producto</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs">
                        <input type="radio" name="goodsType" id="servicio" value="servicio" checked={formData.goodsType === 'servicio'} onChange={(e) => setFormData(prev => ({...prev, goodsType: e.target.value}))} className="w-3.5 h-3.5 text-orange-500 focus:ring-orange-500 bg-slate-900 border-slate-700" />
                        <span className="text-slate-300 text-xs">Servicio</span>
                      </label>
                    </div>
                    {errors.goodsType && <p className="text-red-400 text-[10px] mt-0.5">{errors.goodsType}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="claimedAmount" className="block text-[11px] sm:text-xs font-medium text-slate-400">Monto Reclamado (Opcional)</label>
                    <input 
                      type="text" 
                      id="claimedAmount" 
                      value={formData.claimedAmount}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600"
                      placeholder="Ej. S/ 150.00"
                    />
                  </div>
                  
                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="goodsDescription" className="block text-[11px] sm:text-xs font-medium text-slate-400">Descripción o detalle del bien contratado *</label>
                    <textarea 
                      id="goodsDescription" 
                      rows="2"
                      value={formData.goodsDescription}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.goodsDescription ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600 resize-y`}
                      placeholder="Describe el producto o servicio que adquiriste..."
                    ></textarea>
                    {errors.goodsDescription && <p className="text-red-400 text-[10px] mt-0.5">{errors.goodsDescription}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 sm:p-5 space-y-3">
                <h4 className="text-white font-semibold text-xs sm:text-sm border-b border-slate-800 pb-2">3. Detalle de Reclamo y Pedido</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-400">Tipo de Solicitud *</label>
                    <div className="flex flex-row items-center gap-5 pt-1.5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs">
                        <input type="radio" name="claimType" id="reclamo" value="reclamo" checked={formData.claimType === 'reclamo'} onChange={(e) => setFormData(prev => ({...prev, claimType: e.target.value}))} className="w-3.5 h-3.5 text-orange-500 focus:ring-orange-500 bg-slate-900 border-slate-700" />
                        <span className="text-slate-300 text-xs">Reclamo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs">
                        <input type="radio" name="claimType" id="queja" value="queja" checked={formData.claimType === 'queja'} onChange={(e) => setFormData(prev => ({...prev, claimType: e.target.value}))} className="w-3.5 h-3.5 text-orange-500 focus:ring-orange-500 bg-slate-900 border-slate-700" />
                        <span className="text-slate-300 text-xs">Queja</span>
                      </label>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {formData.claimType === 'reclamo' ? '(Disconformidad con el producto o servicio)' : '(Malestar respecto a la atención al cliente)'}
                    </div>
                    {errors.claimType && <p className="text-red-400 text-[10px] mt-0.5">{errors.claimType}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="incidentDate" className="block text-[11px] sm:text-xs font-medium text-slate-400">Fecha del Incidente *</label>
                    <input 
                      type="date" 
                      id="incidentDate" 
                      value={formData.incidentDate}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-slate-900 border ${errors.incidentDate ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors [color-scheme:dark]`}
                    />
                    {errors.incidentDate && <p className="text-red-400 text-[10px] mt-0.5">{errors.incidentDate}</p>}
                  </div>
                </div>

                <div className="space-y-3 pt-1">

                  <div className="space-y-1">
                    <label htmlFor="details" className="block text-[11px] sm:text-xs font-medium text-slate-400">Detalle *</label>
                    <textarea 
                      id="details" 
                      rows="3"
                      value={formData.details}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.details ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600 resize-y`}
                      placeholder="Describe los hechos que motivan tu reclamo/queja..."
                    ></textarea>
                    {errors.details && <p className="text-red-400 text-[10px] mt-0.5">{errors.details}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="request" className="block text-[11px] sm:text-xs font-medium text-slate-400">Pedido *</label>
                    <textarea 
                      id="request" 
                      rows="2"
                      value={formData.request}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.request ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600 resize-y`}
                      placeholder="¿Qué solicitas que hagamos al respecto?"
                    ></textarea>
                    {errors.request && <p className="text-red-400 text-[10px] mt-0.5">{errors.request}</p>}
                  </div>

                </div>
              </div>

              {/* 4. Observaciones y Acciones Adoptadas por el Proveedor */}
              <div className="bg-slate-950/50 border border-slate-800/50 rounded-xl p-3.5 sm:p-5 space-y-3 opacity-75 grayscale-[30%]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/50 pb-2">
                  <h4 className="text-white/60 font-semibold text-xs sm:text-sm">4. Observaciones y Acciones Adoptadas por el Proveedor</h4>
                  <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded border border-slate-700 w-fit">Espacio exclusivo para la empresa</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-500">Fecha de comunicación de la respuesta</label>
                    <input 
                      type="text" 
                      disabled
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-500 cursor-not-allowed"
                      placeholder="Se llenará al emitir respuesta"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-500">Detalle de la respuesta o acuerdos adoptados</label>
                    <textarea 
                      rows="2"
                      disabled
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-500 cursor-not-allowed resize-none"
                      placeholder="Acciones adoptadas o solución brindada por el establecimiento ante el reclamo presentado..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                {submitError && (
                  <div className="mb-3 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs text-center">
                    {submitError}
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold py-2.5 text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Reclamo / Queja'
                  )}
                </button>
                <p className="text-slate-500 text-[11px] text-center mt-3 leading-relaxed">
                  Al enviar este formulario, aceptas nuestra <a href="/privacidad" className="text-orange-400 hover:underline">Política de Privacidad</a> y autorizas el tratamiento de tus datos para procesar esta solicitud.
                </p>
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
