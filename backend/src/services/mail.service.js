const { Resend } = require('resend');

const crearClienteResend = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY no está configurada.');
  }

  return new Resend(apiKey);
};

const enviarCorreoResend = async ({
  correoDestino,
  nombreDestino,
  subject,
  html
}) => {
  const resend = crearClienteResend();

  const fromName = process.env.MAIL_FROM_NAME || 'Moni';
  const fromEmail = process.env.MAIL_FROM_EMAIL || 'onboarding@resend.dev';

  const { data, error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [correoDestino],
    subject,
    html
  });

  if (error) {
    throw new Error(`Error Resend: ${JSON.stringify(error)}`);
  }

  return data;
};

const enviarCorreoRecuperacionPassword = async ({
  correoDestino,
  nombre,
  resetLink
}) => {
  if (process.env.MAIL_MODE !== 'resend') {
    console.log('MAIL_MODE dev. Link de recuperación:', resetLink);
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 28px; border: 1px solid #e5e7eb;">
        <h2 style="color: #111827; margin-top: 0;">Recuperación de contraseña</h2>

        <p style="color: #4b5563; font-size: 15px;">
          Hola ${nombre || ''},
        </p>

        <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
          Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Moni</strong>.
        </p>

        <p style="margin: 26px 0;">
          <a 
            href="${resetLink}" 
            style="background: #2563eb; color: #ffffff; padding: 13px 18px; border-radius: 12px; text-decoration: none; font-weight: bold; display: inline-block;"
          >
            Restablecer contraseña
          </a>
        </p>

        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Si no solicitaste este cambio, puedes ignorar este correo.
        </p>

        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Este enlace expirará en unos minutos por seguridad.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <p style="color: #9ca3af; font-size: 12px;">
          © 2026 Moni. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `;

  await enviarCorreoResend({
    correoDestino,
    nombreDestino: nombre,
    subject: 'Recupera tu contraseña de Moni',
    html
  });
};

const enviarCorreoVerificacionEmail = async ({
  correoDestino,
  nombre,
  verificationLink
}) => {
  if (process.env.MAIL_MODE !== 'resend') {
    console.log('MAIL_MODE dev. Link de verificación:', verificationLink);
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 28px; border: 1px solid #e5e7eb;">
        <h2 style="color: #111827; margin-top: 0;">Verifica tu cuenta</h2>

        <p style="color: #4b5563; font-size: 15px;">
          Hola ${nombre || ''},
        </p>

        <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
          Gracias por registrarte en <strong>Moni</strong>. Para activar tu cuenta, verifica tu correo haciendo click en el siguiente botón.
        </p>

        <p style="margin: 26px 0;">
          <a 
            href="${verificationLink}" 
            style="background: #2563eb; color: #ffffff; padding: 13px 18px; border-radius: 12px; text-decoration: none; font-weight: bold; display: inline-block;"
          >
            Verificar cuenta
          </a>
        </p>

        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Si no creaste esta cuenta, puedes ignorar este correo.
        </p>

        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Este enlace expirará por seguridad.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <p style="color: #9ca3af; font-size: 12px;">
          © 2026 Moni. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `;

  await enviarCorreoResend({
    correoDestino,
    nombreDestino: nombre,
    subject: 'Verifica tu cuenta de Moni',
    html
  });
};

module.exports = {
  enviarCorreoRecuperacionPassword,
  enviarCorreoVerificacionEmail
};