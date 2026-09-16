// Shared row types matching supabase/schema.sql. Kept hand-written (rather
// than generated) since the schema is small and stable for now — see
// https://supabase.com/docs/guides/api/rest/generating-types if the schema
// grows enough to want generated types instead.

export type Exercise = {
  id: string;
  name: string;
  muscle_group: string | null;
  equipment: string | null;
  is_custom: boolean;
  created_by: string | null;
  created_at: string;
};
