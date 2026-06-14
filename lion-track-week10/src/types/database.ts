export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      lions: {
        Row: {
          id: string;
          name: string;
          part: "Frontend" | "Backend" | "Design";
          grade: string;
          tech: string[];
          intro: string;
          detail_intro: string;
          email: string;
          phone: string;
          website: string;
          comment: string;
          image: string;
          badge: string | null;
          owner_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          part: "Frontend" | "Backend" | "Design";
          grade: string;
          tech: string[];
          intro: string;
          detail_intro: string;
          email: string;
          phone: string;
          website: string;
          comment: string;
          image: string;
          badge?: string | null;
          owner_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          part?: "Frontend" | "Backend" | "Design";
          grade?: string;
          tech?: string[];
          intro?: string;
          detail_intro?: string;
          email?: string;
          phone?: string;
          website?: string;
          comment?: string;
          image?: string;
          badge?: string | null;
          owner_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
