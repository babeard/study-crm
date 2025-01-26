export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string
          created_at: string | null
          id: number
          is_default: boolean
          student_id: string
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: number
          is_default?: boolean
          student_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: number
          is_default?: boolean
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_line_items: {
        Row: {
          amount: number
          created_at: string
          expense_id: number
          id: number
          item_type: Database["public"]["Enums"]["expense_item_type"]
          notes: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          expense_id: number
          id?: number
          item_type: Database["public"]["Enums"]["expense_item_type"]
          notes?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          expense_id?: number
          id?: number
          item_type?: Database["public"]["Enums"]["expense_item_type"]
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_line_items_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_receipts: {
        Row: {
          created_at: string
          expense_id: number
          id: number
          image_url: string | null
          line_item_id: number | null
        }
        Insert: {
          created_at?: string
          expense_id: number
          id?: number
          image_url?: string | null
          line_item_id?: number | null
        }
        Update: {
          created_at?: string
          expense_id?: number
          id?: number
          image_url?: string | null
          line_item_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_receipts_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_receipts_line_item_id_fkey"
            columns: ["line_item_id"]
            isOneToOne: false
            referencedRelation: "expense_line_items"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          created_at: string
          id: number
          notes: string | null
          requestor_id: string
          total: number
        }
        Insert: {
          created_at?: string
          id?: number
          notes?: string | null
          requestor_id: string
          total: number
        }
        Update: {
          created_at?: string
          id?: number
          notes?: string | null
          requestor_id?: string
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "expenses_requestor_id_fkey"
            columns: ["requestor_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      interaction_files: {
        Row: {
          created_at: string | null
          file_url: string
          id: number
          interaction_id: number
          worker_id: string
        }
        Insert: {
          created_at?: string | null
          file_url: string
          id?: number
          interaction_id: number
          worker_id: string
        }
        Update: {
          created_at?: string | null
          file_url?: string
          id?: number
          interaction_id?: number
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interaction_files_interaction_id_fkey"
            columns: ["interaction_id"]
            isOneToOne: false
            referencedRelation: "interactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interaction_files_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      interactions: {
        Row: {
          address_id: number | null
          created_at: string | null
          id: number
          interaction_event: Database["public"]["Enums"]["interaction_event"]
          interaction_type: Database["public"]["Enums"]["interaction_type"]
          progression_id: number
          worker_id: string
        }
        Insert: {
          address_id?: number | null
          created_at?: string | null
          id?: number
          interaction_event?: Database["public"]["Enums"]["interaction_event"]
          interaction_type?: Database["public"]["Enums"]["interaction_type"]
          progression_id: number
          worker_id: string
        }
        Update: {
          address_id?: number | null
          created_at?: string | null
          id?: number
          interaction_event?: Database["public"]["Enums"]["interaction_event"]
          interaction_type?: Database["public"]["Enums"]["interaction_type"]
          progression_id?: number
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_progression_id_fkey"
            columns: ["progression_id"]
            isOneToOne: false
            referencedRelation: "progressions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          study_id: number
          total_score: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          study_id: number
          total_score: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          study_id?: number
          total_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "studies"
            referencedColumns: ["id"]
          },
        ]
      }
      progression_comments: {
        Row: {
          comment: string
          created_at: string | null
          id: number
          is_internal: boolean
          progression_id: number
          worker_id: string
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: number
          is_internal?: boolean
          progression_id: number
          worker_id: string
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: number
          is_internal?: boolean
          progression_id?: number
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progression_comments_progression_id_fkey"
            columns: ["progression_id"]
            isOneToOne: false
            referencedRelation: "progressions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progression_comments_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      progressions: {
        Row: {
          created_at: string | null
          id: number
          lesson_id: number
          returned_at: string | null
          score: number | null
          sent_at: string | null
          subscription_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          lesson_id: number
          returned_at?: string | null
          score?: number | null
          sent_at?: string | null
          subscription_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          lesson_id?: number
          returned_at?: string | null
          score?: number | null
          sent_at?: string | null
          subscription_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "progressions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progressions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      reimbursements: {
        Row: {
          amount: number
          check_num: string | null
          created_at: string
          expense_id: number
          id: number
          notes: string | null
          paid_by_id: string
        }
        Insert: {
          amount: number
          check_num?: string | null
          created_at?: string
          expense_id: number
          id?: number
          notes?: string | null
          paid_by_id: string
        }
        Update: {
          amount?: number
          check_num?: string | null
          created_at?: string
          expense_id?: number
          id?: number
          notes?: string | null
          paid_by_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reimbursements_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reimbursements_paid_by_id_fkey"
            columns: ["paid_by_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      round_robin: {
        Row: {
          id: number
          last_rr_id: number
        }
        Insert: {
          id?: number
          last_rr_id: number
        }
        Update: {
          id?: number
          last_rr_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "round_robin_last_rr_id_fkey"
            columns: ["last_rr_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["rr_id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          do_not_contact: boolean
          email: string | null
          id: string
          internal_notes: string | null
          lead_source: string | null
          name: string
          phone: string | null
          stage: Database["public"]["Enums"]["student_stage"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          do_not_contact?: boolean
          email?: string | null
          id?: string
          internal_notes?: string | null
          lead_source?: string | null
          name: string
          phone?: string | null
          stage?: Database["public"]["Enums"]["student_stage"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          do_not_contact?: boolean
          email?: string | null
          id?: string
          internal_notes?: string | null
          lead_source?: string | null
          name?: string
          phone?: string | null
          stage?: Database["public"]["Enums"]["student_stage"]
          updated_at?: string | null
        }
        Relationships: []
      }
      studies: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          assigned_at: string | null
          assigned_worker_id: string | null
          created_at: string | null
          id: number
          status: Database["public"]["Enums"]["subscription_status"]
          student_id: string
          study_id: number
        }
        Insert: {
          assigned_at?: string | null
          assigned_worker_id?: string | null
          created_at?: string | null
          id?: number
          status?: Database["public"]["Enums"]["subscription_status"]
          student_id: string
          study_id: number
        }
        Update: {
          assigned_at?: string | null
          assigned_worker_id?: string | null
          created_at?: string | null
          id?: number
          status?: Database["public"]["Enums"]["subscription_status"]
          student_id?: string
          study_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_assigned_worker_id_fkey"
            columns: ["assigned_worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "studies"
            referencedColumns: ["id"]
          },
        ]
      }
      workers: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          max_students: number
          role: Database["public"]["Enums"]["worker_role"]
          rr_id: number
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          max_students?: number
          role?: Database["public"]["Enums"]["worker_role"]
          rr_id?: number
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          max_students?: number
          role?: Database["public"]["Enums"]["worker_role"]
          rr_id?: number
          updated_at?: string | null
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
      expense_item_type:
        | "labels"
        | "postage"
        | "envelopes"
        | "program fees"
        | "other"
      interaction_event: "sent" | "received" | "live"
      interaction_type:
        | "letter"
        | "email"
        | "sms"
        | "call"
        | "video"
        | "in-person"
      student_stage: "lead" | "enrolled" | "alumni"
      subscription_status: "active" | "graduated" | "dropped"
      worker_role: "administrator" | "worker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

