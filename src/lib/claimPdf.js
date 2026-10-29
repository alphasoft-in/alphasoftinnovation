import { formatPeruDateTime } from './dateUtils.js';

export function printClaimPdf(claim) {
  if (!claim) return;

  const claimIdFormatted = `LR-${String(claim.id || 1).padStart(5, '0')}`;
  const claimTypeUpper = (claim.claimType || 'reclamo').toUpperCase();
  const regDate = formatPeruDateTime(claim.createdAt || new Date());
  const incidentDate = formatPeruDateTime(claim.incidentDate);
  const respDate = claim.providerResponseDate ? formatPeruDateTime(claim.providerResponseDate) : '-';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Hoja de Reclamación ${claimIdFormatted} - AlphaSoft Innovation</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11px;
      line-height: 1.35;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .no-print-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .btn-print {
      background: #ea580c;
      color: white;
      border: none;
      padding: 8px 18px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn-print:hover {
      background: #c2410c;
    }
    .btn-close {
      background: #334155;
      color: white;
      border: none;
      padding: 8px 14px;
      font-size: 12px;
      border-radius: 6px;
      cursor: pointer;
    }
    @media print {
      .no-print-bar {
        display: none !important;
      }
      body {
        padding: 0;
      }
    }
    .sheet {
      max-width: 800px;
      margin: 0 auto;
      padding: 15px;
      border: 1.5px solid #0f172a;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    .header-table td {
      vertical-align: middle;
    }
    .company-title {
      font-size: 16px;
      font-weight: bold;
      color: #0f172a;
      margin: 0 0 2px 0;
    }
    .company-sub {
      font-size: 10px;
      color: #475569;
      margin: 0;
    }
    .sheet-number-box {
      border: 2px solid #ea580c;
      background: #fff7ed;
      border-radius: 6px;
      padding: 6px 12px;
      text-align: center;
    }
    .sheet-number-title {
      font-size: 11px;
      font-weight: bold;
      color: #c2410c;
      text-transform: uppercase;
      margin: 0;
    }
    .sheet-number {
      font-size: 17px;
      font-weight: 800;
      font-family: monospace;
      color: #9a3412;
      margin: 2px 0 0 0;
    }
    .section-title {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 10px;
      margin-bottom: 4px;
      border-radius: 3px;
    }
    .section-title-company {
      background: #334155;
      color: #ffffff;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 10px;
      margin-bottom: 4px;
      border-radius: 3px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
    }
    table.data-table td, table.data-table th {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      font-size: 10.5px;
    }
    table.data-table td.label {
      background: #f8fafc;
      font-weight: bold;
      color: #334155;
      width: 25%;
    }
    .box-content {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      min-height: 40px;
      font-size: 10.5px;
      margin-bottom: 6px;
      background: #fdfdfd;
      white-space: pre-wrap;
    }
    .legal-footer {
      font-size: 8.5px;
      color: #64748b;
      line-height: 1.3;
      margin-top: 10px;
      border-top: 1px dashed #cbd5e1;
      padding-top: 6px;
    }
    .signatures-table {
      width: 100%;
      margin-top: 25px;
      border-collapse: collapse;
    }
    .signatures-table td {
      width: 50%;
      text-align: center;
      padding: 0 30px;
    }
    .sig-line {
      border-top: 1px solid #0f172a;
      margin-bottom: 4px;
    }
    .sig-text {
      font-size: 10px;
      color: #334155;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <strong>Hoja de Reclamación ${claimIdFormatted}</strong> — Vista de Impresión / Guardar PDF
    </div>
    <div>
      <button class="btn-print" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
      <button class="btn-close" onclick="window.close()" style="margin-left: 8px;">✕ Cerrar</button>
    </div>
  </div>

  <div class="sheet">
    <table class="header-table">
      <tr>
        <td style="width: 65%;">
          <h1 class="company-title">ALPHASOFT INNOVATION TECHNOLOGY</h1>
          <p class="company-sub"><strong>R.U.C. N°:</strong> 20612026387</p>
          <p class="company-sub"><strong>Portal Web:</strong> https://www.alphasoftinnovation.com</p>
          <p class="company-sub"><strong>Correo de Notificaciones:</strong> legal@alphasoftinnovation.com</p>
          <p class="company-sub"><strong>Domicilio:</strong> Lima, Perú</p>
        </td>
        <td style="width: 35%;">
          <div class="sheet-number-box">
            <p class="sheet-number-title">LIBRO DE RECLAMACIONES</p>
            <p style="margin: 0; font-size: 9.5px; font-weight: bold; color: #475569;">HOJA DE RECLAMACIÓN</p>
            <p class="sheet-number">${claimIdFormatted}</p>
            <p style="margin: 2px 0 0 0; font-size: 9px; color: #64748b;">Fecha y Hora: <strong>${regDate}</strong></p>
          </div>
        </td>
      </tr>
    </table>

    <div class="section-title">1. Identificación del Consumidor Reclamante</div>
    <table class="data-table">
      <tr>
        <td class="label">Nombres y Apellidos / Razón Social:</td>
        <td colspan="3"><strong>${claim.fullName || '-'}</strong></td>
      </tr>
      <tr>
        <td class="label">Domicilio:</td>
        <td colspan="3">${claim.address || '-'}</td>
      </tr>
      <tr>
        <td class="label">Tipo y N° Documento:</td>
        <td style="width: 25%;"><strong>${claim.documentType || 'DNI'}: ${claim.documentNumber || '-'}</strong></td>
        <td class="label" style="width: 20%;">Teléfono:</td>
        <td style="width: 30%;">${claim.phone || 'No especificado'}</td>
      </tr>
      <tr>
        <td class="label">Correo Electrónico:</td>
        <td colspan="3">${claim.email || '-'}</td>
      </tr>
    </table>

    <div class="section-title">2. Identificación del Bien Contratado</div>
    <table class="data-table">
      <tr>
        <td class="label">Tipo de Bien:</td>
        <td style="width: 25%; text-transform: uppercase;"><strong>${claim.goodsType || 'SERVICIO'}</strong></td>
        <td class="label" style="width: 20%;">Monto Reclamado:</td>
        <td style="width: 30%; font-weight: bold; color: #b45309;">${claim.claimedAmount ? 'S/ ' + claim.claimedAmount : 'No especificado'}</td>
      </tr>
      <tr>
        <td class="label">Descripción o Detalle:</td>
        <td colspan="3">${claim.goodsDescription || '-'}</td>
      </tr>
    </table>

    <div class="section-title">3. Detalle de la Reclamación y Pedido del Consumidor</div>
    <table class="data-table">
      <tr>
        <td class="label">Naturaleza de la Solicitud:</td>
        <td style="width: 25%;">
          <strong style="color: #c2410c; text-transform: uppercase;">[ X ] ${claimTypeUpper}</strong>
        </td>
        <td class="label" style="width: 20%;">Fecha del Incidente:</td>
        <td style="width: 30%;"><strong>${incidentDate}</strong></td>
      </tr>
    </table>

    <div style="font-weight: bold; font-size: 10px; color: #334155; margin: 4px 0 2px 0;">Detalle de los Hechos que motivan el reclamo / queja:</div>
    <div class="box-content">${claim.details || '-'}</div>

    <div style="font-weight: bold; font-size: 10px; color: #334155; margin: 4px 0 2px 0;">Pedido Concreto del Consumidor:</div>
    <div class="box-content">${claim.request || '-'}</div>

    <div class="section-title-company">4. Observaciones y Acciones Adoptadas por el Proveedor (Uso de la Empresa)</div>
    <table class="data-table">
      <tr>
        <td class="label">Estado del Reclamo:</td>
        <td style="width: 25%; font-weight: bold; text-transform: uppercase;">
          ${claim.status === 'resolved' ? 'ATENDIDO / RESUELTO' : claim.status === 'in_progress' ? 'EN PROCESO' : 'PENDIENTE'}
        </td>
        <td class="label" style="width: 20%;">Fecha de Respuesta:</td>
        <td style="width: 30%;"><strong>${respDate}</strong></td>
      </tr>
    </table>

    <div style="font-weight: bold; font-size: 10px; color: #334155; margin: 4px 0 2px 0;">Detalle de la Respuesta Oficial o Acuerdos Adoptados:</div>
    <div class="box-content" style="min-height: 55px; background: #fafafa;">${claim.providerResponse || 'En proceso de atención dentro del plazo legal establecido.'}</div>

    <table class="signatures-table">
      <tr>
        <td>
          <div class="sig-line"></div>
          <div class="sig-text">Firma del Consumidor Reclamante</div>
        </td>
        <td>
          <div class="sig-line"></div>
          <div class="sig-text">AlphaSoft Innovation Technology<br/><span style="font-size: 8.5px; font-weight: normal; color: #64748b;">Representante / Área Legal</span></div>
        </td>
      </tr>
    </table>

    <div class="legal-footer">
      * <strong>RECLAMO:</strong> Disconformidad relacionada a los productos o servicios ofrecidos.<br/>
      * <strong>QUEJA:</strong> Disconformidad no relacionada a los productos o servicios; o malestar respecto a la atención al público.<br/>
      * La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el <strong>INDECOPI</strong>.<br/>
      * Conforme al Art. 24° de la Ley N° 29571 (Código de Protección y Defensa del Consumidor), el proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles improrrogables.
    </div>
  </div>

  <script>
    // Ejecutar diálogo de impresión automáticamente al abrir
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 350);
    });
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
}
