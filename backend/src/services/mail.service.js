const enviarCorreoGoogleAppsScript = async ({
  correoDestino,
  nombre,
  tipo,
  link
}) => {
  const url = process.env.GOOGLE_APPS_SCRIPT_EMAIL_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_EMAIL_SECRET;

  if (!url) {
    throw new Error('GOOGLE_APPS_SCRIPT_EMAIL_URL no está configurada.');
  }

  if (!secret) {
    throw new Error('GOOGLE_APPS_SCRIPT_EMAIL_SECRET no está configurada.');
  }

  const params = new URLSearchParams({
    secret,
    to: correoDestino,
    nombre: nombre || '',
    type: tipo,
    link,
    fromName: process.env.MAIL_FROM_NAME || 'Moni'
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    method: 'GET'
  });

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`Respuesta inválida de Google Apps Script: ${text}`);
  }

  if (!response.ok || !data.ok) {
    throw new Error(
      data.mensaje || 'No se pudo enviar el correo con Google Apps Script.'
    );
  }

  return data;
};

const enviarCorreoRecuperacionPassword = async ({
  correoDestino,
  nombre,
  resetLink
}) => {
  if (process.env.MAIL_MODE !== 'google_apps_script') {
    console.log('MAIL_MODE dev. Link de recuperación:', resetLink);
    return;
  }

  await enviarCorreoGoogleAppsScript({
    correoDestino,
    nombre,
    tipo: 'reset',
    link: resetLink
  });
};

const enviarCorreoVerificacionEmail = async ({
  correoDestino,
  nombre,
  verificationLink
}) => {
  if (process.env.MAIL_MODE !== 'google_apps_script') {
    console.log('MAIL_MODE dev. Link de verificación:', verificationLink);
    return;
  }

  await enviarCorreoGoogleAppsScript({
    correoDestino,
    nombre,
    tipo: 'verify',
    link: verificationLink
  });
};

module.exports = {
  enviarCorreoRecuperacionPassword,
  enviarCorreoVerificacionEmail
};