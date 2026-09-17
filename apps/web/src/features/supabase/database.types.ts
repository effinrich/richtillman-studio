export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          tags: string[]
          metric: string | null
          href: string
          image: string | null
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          tags?: string[]
          metric?: string | null
          href: string
          image?: string | null
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          tags?: string[]
          metric?: string | null
          href?: string
          image?: string | null
          featured?: boolean
          created_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          category: string
          published_at: string
          read_time: string
          featured: boolean
          content: string[]
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt: string
          category: string
          published_at: string
          read_time: string
          featured?: boolean
          content?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string
          category?: string
          published_at?: string
          read_time?: string
          featured?: boolean
          content?: string[]
          created_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          author: string
          role: string
          company: string
          created_at: string
        }
        Insert: {
          id?: string
          quote: string
          author: string
          role: string
          company: string
          created_at?: string
        }
        Update: {
          id?: string
          quote?: string
          author?: string
          role?: string
          company?: string
          created_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          project_type: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          project_type: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          project_type?: string
          message?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
