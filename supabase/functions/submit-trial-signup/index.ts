import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TrialSignupData {
  fullName: string;
  email: string;
  birthDate: string;
  whatsapp: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing trial signup request");

    const { fullName, email, birthDate, whatsapp }: TrialSignupData = await req.json();

    // Validate input
    if (
      !fullName ||
      fullName.trim().length < 3 ||
      fullName.trim().length > 100
    ) {
      console.error("Invalid fullName:", fullName);
      return new Response(
        JSON.stringify({ error: "Nome deve ter entre 3 e 100 caracteres" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!email || !email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.error("Invalid email:", email);
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate birth date
    if (!birthDate) {
      console.error("Missing birthDate");
      return new Response(
        JSON.stringify({ error: "Data de nascimento é obrigatória" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const birthDateObj = new Date(birthDate);
    if (Number.isNaN(birthDateObj.getTime())) {
      console.error("Invalid birthDate:", birthDate);
      return new Response(
        JSON.stringify({ error: "Data de nascimento inválida" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate age (between 16 and 100 years)
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (actualAge < 16 || actualAge > 100) {
      console.error("Invalid age:", actualAge);
      return new Response(
        JSON.stringify({ error: "Você deve ter entre 16 e 100 anos" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (
      !whatsapp ||
      whatsapp.trim().length < 10 ||
      whatsapp.trim().length > 20
    ) {
      console.error("Invalid whatsapp:", whatsapp);
      return new Response(
        JSON.stringify({ error: "WhatsApp deve ter entre 10 e 20 caracteres" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into database
    const { data, error } = await supabase
      .from("trial_signups")
      .insert({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        birth_date: birthDate,
        whatsapp: whatsapp.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar dados. Tente novamente." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Trial signup saved successfully:", data.id);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing trial signup:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao processar solicitação" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
