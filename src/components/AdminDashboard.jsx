import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [token, setToken] = useState('');
  const [adminUser, setAdminUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState('claims'); // 'claims' | 'contacts' | 'scans'
  const [claims, setClaims] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [scans, setScans] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState('');

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'in_progress' | 'resolved'
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedClaim, setSelectedClaim] = useState(null);
  const [responseStatus, setResponseStatus] = useState('resolved');
  const [responseText, setResponseText] = useState('');
  const [sendEmailToCustomer, setSendEmailToCustomer] = useState(true);
  const [isSavingClaim, setIsSavingClaim] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('alphasoft_admin_token');
    const savedEmail = sessionStorage.getItem('alphasoft_admin_email');
    if (savedToken) {
      setToken(savedToken);
      setAdminUser({ email: savedEmail || 'rtipiani@gmail.com', role: 'Superadministrador' });
      fetchDashboardData(savedToken);
    }
  }, []);

  const fetchDashboardData = async (authToken) => {
    setIsLoadingData(true);
    setDataError('');
    try {
      const res = await fetch('/api/admin', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.error && !data.claims) {
        setDataError(data.error);
      } else {
        setClaims(data.claims || []);
        setContacts(data.contacts || []);
        setScans(data.scans || []);
        if (data.error) setDataError(data.error);
      }
    } catch (err) {
      setDataError('Error de conexión al cargar los registros.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        sessionStorage.setItem('alphasoft_admin_token', data.token);
        sessionStorage.setItem('alphasoft_admin_email', data.user?.email || email);
        setToken(data.token);
        setAdminUser(data.user);
        fetchDashboardData(data.token);
      } else {
        setLoginError(data.error || 'Credenciales incorrectas.');
      }
    } catch {
      setLoginError('Error de conexión con el servidor.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('alphasoft_admin_token');
    sessionStorage.removeItem('alphasoft_admin_email');
    setToken('');
    setAdminUser(null);
    setSelectedClaim(null);
  };

  const openClaimModal = (claim) => {
    setSelectedClaim(claim);
    setResponseStatus(claim.status === 'pending' ? 'resolved' : claim.status);
    setResponseText(claim.providerResponse || '');
    setSendEmailToCustomer(true);
    setSaveMessage(null);
  };

  const handleSaveClaimResponse = async (e) => {
    e.preventDefault();
    if (!selectedClaim) return;

    setIsSavingClaim(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: selectedClaim.id,
          status: responseStatus,
          providerResponse: responseText,
          sendEmailToCustomer,
          customerEmail: selectedClaim.email,
          fullName: selectedClaim.fullName,
          claimType: selectedClaim.claimType
        })
      });

      const data = await res.json();
      if (res.ok) {
        const updatedList = claims.map((c) =>
          c.id === selectedClaim.id
            ? {
                ...c,
                status: responseStatus,
                providerResponse: responseText,
                providerResponseDate: data.providerResponseDate
              }
            : c
        );
        setClaims(updatedList);
        setSelectedClaim({
          ...selectedClaim,
          status: responseStatus,
          providerResponse: responseText,
          providerResponseDate: data.providerResponseDate
        });
        setSaveMessage({
          type: 'success',
          text: data.emailSent
            ? 'Respuesta guardada y enviada por correo al consumidor.'
            : data.emailError
              ? `Respuesta guardada en BD (Aviso correo: ${data.emailError})`
              : 'Estado y respuesta guardados exitosamente.'
        });
      } else {
        setSaveMessage({ type: 'error', text: data.error || 'No se pudo actualizar.' });
      }
    } catch {
      setSaveMessage({ type: 'error', text: 'Error de red al guardar.' });
    } finally {
      setIsSavingClaim(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(dateStr));
    } catch {
      return String(dateStr);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'resolved') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Atendido
        </span>
      );
    }
    if (status === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          En Proceso
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
        Pendiente
      </span>
    );
  };

  // Vista 1: Login de Superadministrador
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-950">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="text-center mb-6">
            <img
              src="/apple-touch-icon.png?v=2"
              alt="AlphaSoft Logo"
              className="w-12 h-12 mx-auto mb-3 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]"
            />
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full mb-2">
              Acceso Restringido
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-white">Panel Superadministrador</h1>
            <p className="text-xs text-slate-400 mt-1">
              Gestión de Libro de Reclamaciones y Solicitudes Comerciales
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">
                Correo de Superadministrador
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rtipiani@gmail.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-medium text-slate-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-3.5 pr-10 py-2 text-xs text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 text-xs text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              {isLoggingIn ? 'Verificando acceso...' : 'Ingresar al Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtrado de reclamos
  const filteredClaims = claims.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      (item.fullName || '').toLowerCase().includes(term) ||
      (item.documentNumber || '').toLowerCase().includes(term) ||
      (item.email || '').toLowerCase().includes(term) ||
      String(item.id).includes(term);
    return matchesStatus && matchesSearch;
  });

  const pendingClaimsCount = claims.filter((c) => c.status === 'pending').length;
  const resolvedClaimsCount = claims.filter((c) => c.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Cabecera exclusiva de Backoffice Admin */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/apple-touch-icon.png?v=2"
              alt="AlphaSoft Logo"
              className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.25)]"
            />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                ALPHA<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">SOFT</span>
                <span className="ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  Admin
                </span>
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {adminUser?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/80 transition-colors"
            >
              Ver Web ↗
            </a>
            <button
              onClick={() => fetchDashboardData(token)}
              disabled={isLoadingData}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              {isLoadingData ? 'Actualizando...' : 'Actualizar Datos'}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/30 transition-colors cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-[11px] text-slate-400">Total Reclamos / Quejas</p>
          <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">{claims.length}</p>
        </div>
        <div className="bg-slate-900 border border-red-500/30 rounded-xl p-4">
          <p className="text-[11px] text-red-300">Reclamos Pendientes</p>
          <p className="text-xl sm:text-2xl font-extrabold text-red-400 mt-1">{pendingClaimsCount}</p>
        </div>
        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4">
          <p className="text-[11px] text-emerald-300">Reclamos Atendidos</p>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">{resolvedClaimsCount}</p>
        </div>
        <div className="bg-slate-900 border border-orange-500/30 rounded-xl p-4">
          <p className="text-[11px] text-orange-300">Consultas de Contacto</p>
          <p className="text-xl sm:text-2xl font-extrabold text-orange-400 mt-1">{contacts.length}</p>
        </div>
      </div>

      {dataError && (
        <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
          {dataError}
        </div>
      )}

      {/* Pestañas */}
      <div className="flex flex-wrap gap-2 mb-5 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('claims')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'claims'
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Libro de Reclamaciones ({claims.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'contacts'
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Solicitudes de Contacto ({contacts.length})
        </button>
        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'scans'
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Auditorías Web ({scans.length})
        </button>
      </div>

      {/* TAB 1: LIBRO DE RECLAMACIONES */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between bg-slate-900 border border-slate-800 rounded-xl p-3.5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, DNI/RUC, correo o N°..."
              className="w-full sm:max-w-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
            />
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'pending', label: 'Pendientes' },
                { id: 'in_progress', label: 'En Proceso' },
                { id: 'resolved', label: 'Atendidos' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                    statusFilter === st.id
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {filteredClaims.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400">
              No se encontraron reclamos ni quejas con los filtros actuales.
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 uppercase">
                      <th className="py-3 px-4">Hoja N°</th>
                      <th className="py-3 px-4">Fecha</th>
                      <th className="py-3 px-4">Tipo</th>
                      <th className="py-3 px-4">Consumidor</th>
                      <th className="py-3 px-4">Documento</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {filteredClaims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-orange-400">
                          LR-{String(claim.id).padStart(5, '0')}
                        </td>
                        <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                          {formatDate(claim.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="uppercase font-bold text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                            {claim.claimType}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{claim.fullName}</div>
                          <div className="text-[11px] text-slate-400">{claim.email}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                          {claim.documentType}: {claim.documentNumber}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(claim.status)}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => openClaimModal(claim)}
                            className="px-3 py-1.5 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/30 font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            Ver / Responder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SOLICITUDES DE CONTACTO */}
      {activeTab === 'contacts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Aún no hay solicitudes de contacto registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 uppercase">
                    <th className="py-3 px-4">Fecha</th>
                    <th className="py-3 px-4">Cliente / Empresa</th>
                    <th className="py-3 px-4">Contacto</th>
                    <th className="py-3 px-4">Detalle de la Consulta</th>
                    <th className="py-3 px-4 text-right">Respuesta Rápida</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap align-top">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white align-top">{c.name}</td>
                      <td className="py-3 px-4 align-top">
                        <div className="text-slate-200">{c.email}</div>
                        <div className="text-slate-400 text-[11px]">{c.phone || '-'}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-md whitespace-pre-wrap align-top">
                        {c.message}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap align-top space-x-2">
                        {c.phone && (
                          <a
                            href={`https://wa.me/51${c.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${c.name}, te saludamos de AlphaSoft Innovation respecto a tu solicitud de contacto.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 font-semibold text-[11px]"
                          >
                            WhatsApp
                          </a>
                        )}
                        <a
                          href={`mailto:${c.email}?subject=${encodeURIComponent('Respuesta a tu consulta — AlphaSoft Innovation')}`}
                          className="inline-block px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/30 font-semibold text-[11px]"
                        >
                          Correo
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: AUDITORÍAS WEB */}
      {activeTab === 'scans' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {scans.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Aún no hay auditorías web registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 uppercase">
                    <th className="py-3 px-4">Fecha</th>
                    <th className="py-3 px-4">URL Analizada</th>
                    <th className="py-3 px-4">Puntaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {scans.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {formatDate(s.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-white font-medium">{s.url}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-orange-400">{s.score || '-'} / 100</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL EJECUTIVO DE DETALLE Y RESPUESTA DE HOJA DE RECLAMACIÓN */}
      {selectedClaim && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedClaim(null);
          }}
        >
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full shadow-[0_25px_70px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col max-h-[92vh]">
            {/* Cabecera fija del modal */}
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-slate-950/90 border-b border-slate-800 shrink-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  LR-{String(selectedClaim.id).padStart(5, '0')}
                </span>
                <span className="uppercase text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedClaim.claimType}
                </span>
                {getStatusBadge(selectedClaim.status)}
                <span className="text-[11px] text-slate-400 hidden sm:inline ml-1">
                  • Registrado: {formatDate(selectedClaim.createdAt)}
                </span>
              </div>

              <button
                onClick={() => setSelectedClaim(null)}
                aria-label="Cerrar modal"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cuerpo del modal en 2 columnas en Desktop (sin barra blanca) */}
            <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
              {/* Columna Izquierda (7 cols): Expediente de la Hoja de Reclamación */}
              <div className="lg:col-span-7 space-y-4">
                {/* 1. Identificación del Consumidor */}
                <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      1. Datos del Consumidor
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {selectedClaim.documentType}: {selectedClaim.documentNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <span className="text-[10px] text-slate-500 block">Nombre o Razón Social</span>
                      <span className="text-sm font-bold text-white">{selectedClaim.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Correo Electrónico</span>
                      <a href={`mailto:${selectedClaim.email}`} className="text-orange-400 hover:underline font-medium break-all">
                        {selectedClaim.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Teléfono</span>
                      <span className="text-slate-200 font-medium">{selectedClaim.phone || 'No especificado'}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-[10px] text-slate-500 block">Domicilio</span>
                      <span className="text-slate-300">{selectedClaim.address}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Bien Contratado */}
                <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      2. Bien Contratado ({selectedClaim.goodsType})
                    </span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md">
                      Monto: {selectedClaim.claimedAmount ? `S/ ${selectedClaim.claimedAmount}` : 'No especificado'}
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedClaim.goodsDescription}
                  </p>
                </div>

                {/* 3. Detalle y Pedido */}
                <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      3. Fundamento del Reclamo
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Incidente: <strong className="text-slate-200">{selectedClaim.incidentDate}</strong>
                    </span>
                  </div>

                  <div className="pl-3 border-l-2 border-orange-500">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block mb-1">
                      Detalle de los Hechos
                    </span>
                    <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {selectedClaim.details}
                    </p>
                  </div>

                  <div className="pl-3 border-l-2 border-amber-400 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      Pedido Concreto del Consumidor
                    </span>
                    <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {selectedClaim.request}
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna Derecha (5 cols): 4. Resolución Oficial AlphaSoft */}
              <div className="lg:col-span-5 flex flex-col">
                <form
                  onSubmit={handleSaveClaimResponse}
                  className="bg-gradient-to-b from-slate-950 to-slate-900 border border-orange-500/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full space-y-4 shadow-inner"
                >
                  <div className="space-y-3.5">
                    <div className="border-b border-slate-800 pb-2.5 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block">
                          Sección 4 • Uso Exclusivo
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                          Resolución y Respuesta Oficial
                        </h4>
                      </div>
                      {selectedClaim.providerResponseDate && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {selectedClaim.providerResponseDate}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                        Estado del Expediente
                      </label>
                      <select
                        value={responseStatus}
                        onChange={(e) => setResponseStatus(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="pending">Pendiente de Atención</option>
                        <option value="in_progress">En Proceso de Revisión</option>
                        <option value="resolved">Atendido / Resuelto</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                        Observaciones y Acciones Adoptadas
                      </label>
                      <textarea
                        rows="5"
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Redacta aquí la respuesta formal o solución adoptada por AlphaSoft Innovation..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
                      ></textarea>
                    </div>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={sendEmailToCustomer}
                        onChange={(e) => setSendEmailToCustomer(e.target.checked)}
                        className="mt-0.5 rounded border-slate-700 bg-slate-950 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-[11px] text-slate-300 leading-snug">
                        Notificar por correo a <strong className="text-white">{selectedClaim.email}</strong>
                        <span className="block text-[10px] text-slate-500 mt-0.5">
                          Con copia automática a legal@ y rubenesteban@
                        </span>
                      </span>
                    </label>

                    {saveMessage && (
                      <div
                        className={`p-2.5 rounded-lg text-[11px] text-center font-medium ${
                          saveMessage.type === 'success'
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                            : 'bg-red-500/15 border border-red-500/30 text-red-400'
                        }`}
                      >
                        {saveMessage.text}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setSelectedClaim(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingClaim}
                      className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                    >
                      {isSavingClaim ? 'Procesando...' : 'Guardar y Notificar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

