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
      margin: 8mm 10mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      background: #f8fafc;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11.5px;
      line-height: 1.4;
      color: #0f172a;
    }
    .no-print-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 10px 24px;
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
      padding: 8px 20px;
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
      padding: 8px 16px;
      font-size: 12px;
      border-radius: 6px;
      cursor: pointer;
    }
    .sheet {
      width: 95%;
      max-width: 960px;
      margin: 15px auto;
      padding: 18px 22px;
      background: #ffffff;
      border: 2px solid #0f172a;
      box-shadow: 0 4px 15px rgba(0,0,0,0.06);
    }
    @media print {
      html, body {
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
      .no-print-bar {
        display: none !important;
      }
      .sheet {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 14px 18px !important;
        border: 2px solid #0f172a !important;
        box-shadow: none !important;
        page-break-inside: avoid;
      }
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
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.2px;
      margin: 0 0 3px 0;
    }
    .company-sub {
      font-size: 10.5px;
      line-height: 1.4;
      color: #334155;
      margin: 0;
    }
    .sheet-number-box {
      border: 2px solid #ea580c;
      background: #fff7ed;
      border-radius: 6px;
      padding: 8px 14px;
      text-align: center;
    }
    .sheet-number-title {
      font-size: 11px;
      font-weight: 800;
      color: #c2410c;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .sheet-number {
      font-size: 20px;
      font-weight: 900;
      font-family: monospace;
      color: #9a3412;
      margin: 2px 0;
    }
    .section-title {
      background: #0f172a;
      color: #ffffff;
      padding: 5px 10px;
      font-size: 11.5px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 12px;
      margin-bottom: 5px;
      border-radius: 3px;
    }
    .section-title-company {
      background: #1e293b;
      color: #ffffff;
      padding: 5px 10px;
      font-size: 11.5px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 12px;
      margin-bottom: 5px;
      border-radius: 3px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
    }
    table.data-table td, table.data-table th {
      border: 1px solid #94a3b8;
      padding: 6px 10px;
      font-size: 11px;
      vertical-align: middle;
    }
    table.data-table td.label {
      background: #f8fafc;
      font-weight: bold;
      color: #1e293b;
      width: 26%;
    }
    .box-label {
      font-weight: bold;
      font-size: 11px;
      color: #1e293b;
      margin: 6px 0 3px 0;
    }
    .box-content {
      border: 1px solid #94a3b8;
      padding: 9px 12px;
      min-height: 50px;
      font-size: 11px;
      line-height: 1.45;
      margin-bottom: 6px;
      background: #fafafa;
      white-space: pre-wrap;
    }
    .signatures-table {
      width: 100%;
      margin-top: 40px;
      margin-bottom: 12px;
      border-collapse: collapse;
    }
    .signatures-table td {
      width: 50%;
      text-align: center;
      padding: 0 40px;
    }
    .sig-line {
      border-top: 1.5px solid #0f172a;
      margin-bottom: 5px;
      width: 85%;
      margin-left: auto;
      margin-right: auto;
    }
    .sig-text {
      font-size: 11px;
      color: #1e293b;
      font-weight: bold;
      line-height: 1.35;
    }
    .legal-footer {
      font-size: 8.5px;
      color: #475569;
      line-height: 1.35;
      margin-top: 12px;
      border-top: 1px dashed #cbd5e1;
      padding-top: 8px;
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
            <p style="margin: 0; font-size: 10px; font-weight: bold; color: #475569;">HOJA DE RECLAMACIÓN</p>
            <p class="sheet-number">${claimIdFormatted}</p>
            <p style="margin: 2px 0 0 0; font-size: 9.5px; color: #64748b;">Fecha y Hora: <strong>${regDate}</strong></p>
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
        <td style="width: 29%;">${claim.phone || 'No especificado'}</td>
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
        <td style="width: 29%; font-weight: bold; color: #b45309;">${claim.claimedAmount ? 'S/ ' + claim.claimedAmount : 'No especificado'}</td>
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
        <td style="width: 29%;"><strong>${incidentDate}</strong></td>
      </tr>
    </table>

    <div class="box-label">Detalle de los Hechos que motivan el reclamo / queja:</div>
    <div class="box-content">${claim.details || '-'}</div>

    <div class="box-label">Pedido Concreto del Consumidor:</div>
    <div class="box-content">${claim.request || '-'}</div>

    <div class="section-title-company">4. Observaciones y Acciones Adoptadas por el Proveedor (Uso de la Empresa)</div>
    <table class="data-table">
      <tr>
        <td class="label">Estado del Reclamo:</td>
        <td style="width: 25%; font-weight: bold; text-transform: uppercase;">
          ${claim.status === 'resolved' ? 'ATENDIDO / RESUELTO' : claim.status === 'in_progress' ? 'EN PROCESO' : 'PENDIENTE'}
        </td>
        <td class="label" style="width: 20%;">Fecha de Respuesta:</td>
        <td style="width: 29%;"><strong>${respDate}</strong></td>
      </tr>
    </table>

    <div class="box-label">Detalle de la Respuesta Oficial o Acuerdos Adoptados:</div>
    <div class="box-content" style="min-height: 65px; background: #ffffff;">${claim.providerResponse || 'En proceso de atención dentro del plazo legal establecido.'}</div>

    <table class="signatures-table">
      <tr>
        <td>
          <div class="sig-line"></div>
          <div class="sig-text">Firma del Consumidor Reclamante</div>
        </td>
        <td>
          <div class="sig-line"></div>
          <div class="sig-text">AlphaSoft Innovation Technology<br/><span style="font-size: 9px; font-weight: normal; color: #475569;">Representante / Área Legal</span></div>
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
