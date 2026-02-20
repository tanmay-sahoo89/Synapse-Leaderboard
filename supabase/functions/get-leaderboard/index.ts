import { createClient } from "supabase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, apikey, X-Supabase-Auth",
};

interface LeaderboardEntry {
  id: string;
  rank: number;
  teamName: string;
  score: number;
  maxPoints: number;
  percentage: number;
  status: string;
  department?: string;
  time_taken?: number | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Explicitly select columns to ensure team_name is included
    const { data: participants, error } = await supabase
      .from("participants")
      .select(
        "id, team_name, score, time_taken, attempts, department, rank, previous_rank, created_at, updated_at",
      )
      .order("score", { ascending: false })
      .order("time_taken", { ascending: true });

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error(`Database query failed: ${error.message}`);
    }

    if (!participants || participants.length === 0) {
      return new Response(
        JSON.stringify({
          participants: [],
          lastSync: new Date().toISOString(),
          totalParticipants: 0,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const entries: LeaderboardEntry[] = participants.map((row, index) => {
      const maxPoints = 50;
      const percentage =
        maxPoints > 0 ? Math.round((row.score / maxPoints) * 100) : 0;

      return {
        id: row.id,
        teamName: row.team_name || "Unknown Team",
        score: Number(row.score) || 0,
        maxPoints,
        percentage,
        status: "active",
        department: row.department || "General",
        rank: index + 1,
        time_taken: row.time_taken,
      };
    });

    return new Response(
      JSON.stringify({
        participants: entries,
        lastSync: new Date().toISOString(),
        totalParticipants: entries.length,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        participants: [],
        lastSync: new Date().toISOString(),
        totalParticipants: 0,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});
