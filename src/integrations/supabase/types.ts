export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      room_messages: {
        Row: {
          avatar_color: string
          content: string
          created_at: string
          id: string
          kind: string
          nickname: string
          room_id: string
          user_id: string | null
        }
        Insert: {
          avatar_color?: string
          content: string
          created_at?: string
          id?: string
          kind?: string
          nickname: string
          room_id: string
          user_id?: string | null
        }
        Update: {
          avatar_color?: string
          content?: string
          created_at?: string
          id?: string
          kind?: string
          nickname?: string
          room_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_players: {
        Row: {
          avatar_color: string
          guess_order: number | null
          has_guessed: boolean
          id: string
          is_connected: boolean
          joined_at: string
          nickname: string
          room_id: string
          round_score: number
          score: number
          user_id: string
        }
        Insert: {
          avatar_color?: string
          guess_order?: number | null
          has_guessed?: boolean
          id?: string
          is_connected?: boolean
          joined_at?: string
          nickname: string
          room_id: string
          round_score?: number
          score?: number
          user_id: string
        }
        Update: {
          avatar_color?: string
          guess_order?: number | null
          has_guessed?: boolean
          id?: string
          is_connected?: boolean
          joined_at?: string
          nickname?: string
          room_id?: string
          round_score?: number
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_players_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_secrets: {
        Row: {
          current_word: string | null
          room_id: string
          updated_at: string
        }
        Insert: {
          current_word?: string | null
          room_id: string
          updated_at?: string
        }
        Update: {
          current_word?: string | null
          room_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_secrets_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: true
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          choose_seconds: number
          code: string
          created_at: string
          current_drawer_id: string | null
          current_round: number
          current_turn: number
          custom_words: string[]
          drawer_order: string[]
          host_id: string
          id: string
          is_public: boolean
          language: string
          max_players: number
          round_ends_at: string | null
          round_seconds: number
          round_started_at: string | null
          status: string
          total_rounds: number
          updated_at: string
          use_custom_only: boolean
          word_choices: string[] | null
          word_mask: string | null
        }
        Insert: {
          choose_seconds?: number
          code: string
          created_at?: string
          current_drawer_id?: string | null
          current_round?: number
          current_turn?: number
          custom_words?: string[]
          drawer_order?: string[]
          host_id: string
          id?: string
          is_public?: boolean
          language?: string
          max_players?: number
          round_ends_at?: string | null
          round_seconds?: number
          round_started_at?: string | null
          status?: string
          total_rounds?: number
          updated_at?: string
          use_custom_only?: boolean
          word_choices?: string[] | null
          word_mask?: string | null
        }
        Update: {
          choose_seconds?: number
          code?: string
          created_at?: string
          current_drawer_id?: string | null
          current_round?: number
          current_turn?: number
          custom_words?: string[]
          drawer_order?: string[]
          host_id?: string
          id?: string
          is_public?: boolean
          language?: string
          max_players?: number
          round_ends_at?: string | null
          round_seconds?: number
          round_started_at?: string | null
          status?: string
          total_rounds?: number
          updated_at?: string
          use_custom_only?: boolean
          word_choices?: string[] | null
          word_mask?: string | null
        }
        Relationships: []
      }
      word_bank: {
        Row: {
          category: string | null
          id: string
          language: string
          word: string
        }
        Insert: {
          category?: string | null
          id?: string
          language: string
          word: string
        }
        Update: {
          category?: string | null
          id?: string
          language?: string
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
