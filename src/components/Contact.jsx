import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const serviceOptions = [
  "Diseño y Desarrollo Web",
  "Sistemas a Medida (ERP / CRM / WMS)",
  "Facturación Electrónica SUNAT / OSE",
  "Automatización de Procesos",
  "Ciencia de Datos y Business Intelligence (BI)",
  "Integración de Sistemas y APIs",
  "Soporte y Consultoría Tecnológica"
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    documentNumber: '',
    serviceType: '',
    email: '',
    phone: '',
    message: '',
    websiteHoneypot: '' // Hidden honeypot field against bots
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // reCAPTCHA state
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaChecking, setCaptchaChecking] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const siteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    window.onRecaptchaSuccess = (token) => {
      setRecaptchaToken(token);
      setCaptchaVerified(true);
      setErrors(prev => ({ ...prev, captcha: null }));
    };
    window.onRecaptchaExpired = () => {
      setRecaptchaToken(null);
      setCaptchaVerified(false);
    };
    if (!document.querySelector('#google-recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'google-recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [siteKey]);

  const handleCustomCaptchaClick = () => {
    if (captchaVerified || captchaChecking) return;
    setCaptchaChecking(true);
    setTimeout(() => {
      setCaptchaChecking(false);
      setCaptchaVerified(true);
      setRecaptchaToken('verified_client_challenge');
      if (errors.captcha) {
        setErrors(prev => ({ ...prev, captcha: null }));
      }
    }, 650);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre o razón social es obligatorio';

    const doc = formData.documentNumber.trim();
    if (!doc) {
      newErrors.documentNumber = 'El DNI o RUC es obligatorio';
    } else if (!/^(\d{8}|\d{11}|[A-Za-z0-9]{6,15})$/.test(doc)) {
      newErrors.documentNumber = 'Ingresa un DNI (8 dígitos), RUC (11 dígitos) o CE válido';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Selecciona un tipo de servicio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del correo es inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\+?\d{7,15}$/.test(formData.phone.trim().replace(/\s/g, ''))) {
      newErrors.phone = 'Ingresa un teléfono válido (7 a 15 dígitos)';
    }

    if (!formData.message.trim()) newErrors.message = 'Por favor ingresa un mensaje';

    if (!captchaVerified) {
      newErrors.captcha = 'Por favor confirma que no eres un robot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (formData.websiteHoneypot) {
      // Silent reject for automated spam bots
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            recaptchaToken
          }),
        });
        const data = await response.json();

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            documentNumber: '',
            serviceType: '',
            email: '',
            phone: '',
            message: '',
            websiteHoneypot: ''
          });
          setCaptchaVerified(false);
          setRecaptchaToken(null);
        } else {
          setSubmitError(data.error || 'Ocurrió un error al enviar el mensaje.');
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Ponte en <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Contacto</span></h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed px-2 sm:px-0">
              ¿Listo para transformar tu empresa con tecnología de primer nivel? Hablemos de tu próximo proyecto.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Columna Izquierda: Información de Contacto + Iframe Mapa */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 order-1"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 relative">
              {/* Ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl opacity-30 -z-10 rounded-2xl"></div>
              
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-4 text-center sm:text-left">Nuestros Datos</h3>
              
              <div className="space-y-3.5">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-white">Llámanos o escríbenos</h4>
                      <a href="tel:959464155" className="text-[11px] sm:text-xs text-slate-400 hover:text-orange-400 transition-colors mt-0.5 block">959 464 155</a>
                    </div>
                    <a
                      href={`https://wa.me/51959464155?text=${encodeURIComponent('Hola AlphaSoft, me gustaría recibir asesoría directa por WhatsApp.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                      Chat WhatsApp
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 flex-shrink-0">
                    <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Correos</h4>
                    <a href="mailto:hola@alphasoftinnovation.com" className="text-[11px] sm:text-xs text-slate-400 hover:text-orange-400 transition-colors mt-0.5 block break-all">hola@alphasoftinnovation.com</a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Empresa</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Alphasoft Innovation — RUC: 20612026387</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Ubicación</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Lima, Perú</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa Iframe */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex-1 min-h-[160px] overflow-hidden shadow-xl">
              <iframe
                title="Ubicación AlphaSoft Innovation - Lima, Perú"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124859.95770457913!2d-77.11572655!3d-12.05216515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f619ee3ec7%3A0x14206cb9cc452e4a!2sLima!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe"
                className="w-full h-full min-h-[150px] rounded-xl border-0 grayscale invert-[90%] hue-rotate-180 contrast-125 opacity-85 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Columna Derecha: Formulario de Contacto */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl order-2"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                <p className="text-slate-400 text-xs mb-5 max-w-sm mx-auto">
                  Gracias por contactarnos. Nuestro equipo revisará tu solicitud y se comunicará contigo a la brevedad.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                {/* Honeypot anti-bot field */}
                <input
                  type="text"
                  id="websiteHoneypot"
                  value={formData.websiteHoneypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="serviceType" className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Tipo de Servicio *</label>
                  <select
                    id="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`w-full bg-slate-950 border ${errors.serviceType ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-3 pr-9 py-1.5 md:py-2 text-xs ${formData.serviceType ? 'text-white' : 'text-slate-500'} focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors cursor-pointer`}
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
                    <option value="" disabled className="text-slate-500 bg-slate-950">Selecciona el servicio de tu interés...</option>
                    {serviceOptions.map((srv, idx) => (
                      <option key={idx} value={srv} className="text-white bg-slate-950">{srv}</option>
                    ))}
                  </select>
                  {errors.serviceType && <p className="text-red-500 text-[10px] mt-0.5">{errors.serviceType}</p>}
                </div>

                <div>
                  <label htmlFor="documentNumber" className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">N° de Documento (DNI / RUC) *</label>
                  <input 
                    type="text" 
                    id="documentNumber"
                    maxLength={15}
                    value={formData.documentNumber}
                    onChange={handleChange}
                    className={`w-full bg-slate-950 border ${errors.documentNumber ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3 py-1.5 md:py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                    placeholder="Ej. 20612026387 o 74839210"
                  />
                  {errors.documentNumber && <p className="text-red-500 text-[10px] mt-0.5">{errors.documentNumber}</p>}
                </div>

                <div>
                  <label htmlFor="name" className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Nombre o Razón Social *</label>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-slate-950 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3 py-1.5 md:py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                    placeholder="Ej. Juan Pérez / Empresa SAC"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name}</p>}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="phone" className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Teléfono *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3 py-1.5 md:py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                      placeholder="Ej. 987 654 321"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3 py-1.5 md:py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-slate-600`}
                      placeholder="ejemplo@correo.com"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">Mensaje *</label>
                  <textarea 
                    id="message" 
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-slate-950 border ${errors.message ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3 py-1.5 md:py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none placeholder:text-slate-600`}
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-[10px] mt-0.5">{errors.message}</p>}
                </div>

                {/* reCAPTCHA Security Box (Centered) */}
                <div className="flex flex-col items-center pt-0.5">
                  {siteKey ? (
                    <div
                      ref={recaptchaRef}
                      className="g-recaptcha scale-90 origin-center"
                      data-sitekey={siteKey}
                      data-theme="dark"
                      data-callback="onRecaptchaSuccess"
                      data-expired-callback="onRecaptchaExpired"
                    ></div>
                  ) : (
                    <div
                      onClick={handleCustomCaptchaClick}
                      role="checkbox"
                      aria-checked={captchaVerified}
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCustomCaptchaClick()}
                      className={`flex items-center justify-between w-full max-w-[260px] bg-slate-950 border ${errors.captcha ? 'border-red-500' : captchaVerified ? 'border-emerald-500/50' : 'border-slate-700 hover:border-slate-600'} rounded-xl px-3.5 py-2 cursor-pointer select-none transition-colors`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${captchaVerified ? 'bg-emerald-500/20 border-emerald-500' : 'bg-slate-900 border-slate-600'}`}>
                          {captchaChecking ? (
                            <svg className="w-3.5 h-3.5 text-orange-400 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                          ) : captchaVerified ? (
                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : null}
                        </div>
                        <span className="text-[11px] text-slate-200 font-medium">No soy un robot</span>
                      </div>
                      <div className="flex flex-col items-center text-[8px] text-slate-500 leading-tight">
                        <svg className="w-4 h-4 text-slate-400 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>reCAPTCHA</span>
                      </div>
                    </div>
                  )}
                  {errors.captcha && <p className="text-red-500 text-[10px] mt-1 text-center">{errors.captcha}</p>}
                </div>

                {submitError && (
                  <div className="p-2.5 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs text-center">
                    {submitError}
                  </div>
                )}

                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-bold py-2 md:py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer text-xs mt-1 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
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
                    'Enviar Mensaje'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
