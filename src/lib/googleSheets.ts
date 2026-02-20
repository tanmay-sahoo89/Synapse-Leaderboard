export interface LeaderboardEntry {
  id?: string;
  uid?: string;
  rank?: number;
  previous_rank?: number;
  teamName: string;
  score: number;
  maxPoints: number;
  percentage: number;
  status: string;
  avatar_url?: string;
  department?: string;
  time_taken?: number | null;
}

export class GoogleSheetsService {
  private apiUrl: string;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      throw new Error("Missing Supabase environment variables");
    }

    this.apiUrl = `${supabaseUrl}/functions/v1/get-leaderboard`;
  }

  async getLeaderboardData(): Promise<LeaderboardEntry[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data.participants || [];
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      throw error;
    }
  }

  watchForChanges(callback: (data: LeaderboardEntry[]) => void): () => void {
    const interval = setInterval(async () => {
      try {
        const data = await this.getLeaderboardData();
        callback(data);
      } catch (error) {
        console.error("Error in watchForChanges:", error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }
}

export const googleSheetsService = new GoogleSheetsService();
